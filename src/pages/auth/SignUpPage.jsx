import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signup, checkUsername } from "../../apis/user";
import { sendSignMail, checkMail } from "../../apis/auth";
import {
  usernameRegex,
  nameRegex,
  passwordRegex,
  nicknameRegex,
  emailRegex,
  phoneRegex,
} from "../../utils/regexPatterns";

const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [isUsernameAvailable, setUsernameAvailable] = useState(false); // 아이디 중복확인

  const [authNum, setAuthNum] = useState(false); // 인증번호
  const [isEmailVerified, setEmailVerified] = useState(false); // 인증 확인
  const [timer, setTimer] = useState(0);
  const [isResendDisabled, setResendDisabled] = useState(false);

  useEffect(() => {
    // 타이머 기능 추가
    let interval;

    if (timer >= 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            // 타이머가 종료되면 인증상태를 초기화합니다.
            setEmailVerified(false);
            setAuthNum(false);
            setResendDisabled(false);
            return 0; // 타이머 초기값으로 재설정
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 해제
  }, [timer]);

  // 시간을 "mm:ss" 형식으로 포맷하는 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  // 아이디 중복 확인
  const handleCheckUsername = async (username) => {
    if (isUsernameAvailable) return;
    else if (!username) {
      setError("username", {
        type: "required",
        message: "아이디를 입력해주세요",
      });
      return;
    } else if (!usernameRegex.test(username)) {
      setError("username", {
        type: "pattern",
        message: "아이디는 5~20자의 영문, 숫자만 사용 가능합니다",
      });
      return;
    }
    const result = await checkUsername(username);
    if (result) {
      clearErrors("username");
      setUsernameAvailable(true);
    } else {
      setError("username", {
        type: "custom",
        message: "사용할 수 없는 아이디입니다",
      });
      return;
    }
  };

  // 인증번호 요청
  const requestAuthNum = async (email) => {
    clearErrors("number");
    if (!email) {
      setError("email", {
        type: "required",
        message: "이메일을 입력해주세요",
      });
      return;
    } else if (!emailRegex.test(email)) {
      setError("email", {
        type: "pattern",
        message: "이메일 형식이 올바르지 않습니다",
      });
      return;
    } else clearErrors("email");

    setResendDisabled(true);
    const response = await sendSignMail(email);
    if (response === 200) {
      setAuthNum(true);
      setTimer(180); // 3분 타이머로 설정
    } else {
      setAuthNum(false);
      setError("email", {
        type: "custom",
        message: "인증번호 전송을 실패했습니다. 다시 시도해주세요",
      });

      // setResendDisabled(false);
    }
  };

  // 인증 확인
  const checkAuthNum = async (number) => {
    if (!number) {
      setError("number", {
        type: "required",
        message: "인증번호를 입력해주세요",
      });
      return;
    } else if (timer === 0) {
      setError("number", {
        type: "custom",
        message: "인증 시간이 만료되었습니다",
      });
      return;
    }

    const response = await checkMail({
      email: getValues("email"),
      authCode: number,
    });

    if (response.status === 200) {
      clearErrors("number");
      setEmailVerified(true);
    } else {
      setError("number", {
        type: "pattern",
        message: "인증번호가 올바르지 않습니다",
      });
      setEmailVerified(false);
    }
  };

  const onSubmit = async (data) => {
    const result = await signup(data);
    if (result) {
      // 회원가입 성공시 로그인 페이지로 이동
      navigate("/login");
    } else {
      // 회원가입 실패시
    }
  };

  return (
    <div className="auth-container">
      <header className="auth-header">
        <div className="auth-header_logo">
          <h1 className="logo">
            <Link to="/">
              <span className="green">Lost</span>em
            </Link>
          </h1>
        </div>
      </header>
      <div className="auth-content">
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="아이디*"
              {...register("username", {
                required: "아이디를 입력해주세요",
                pattern: {
                  value: usernameRegex,
                  message: "아이디는 5~20자의 영문, 숫자만 사용 가능합니다",
                },
                validate: () =>
                  isUsernameAvailable || "아이디 중복 여부를 확인을 해주세요",
                onChange: () => setUsernameAvailable(false),
              })}
            />
            <button
              type="button"
              onClick={() => handleCheckUsername(getValues("username"))}
            >
              중복 확인
            </button>
          </div>
          {errors?.username?.message && (
            <span className="error">{errors?.username?.message}</span>
          )}
          {isUsernameAvailable && (
            <span className="green success">사용가능한 아이디입니다</span>
          )}
          <input
            type="password"
            placeholder="비밀번호*"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              pattern: {
                value: passwordRegex,
                message: "비밀번호는 6~20자의 영문과 숫자만 사용 가능합니다",
              },
            })}
          />
          {errors?.password?.message && (
            <span className="error">{errors?.password?.message}</span>
          )}
          <input
            type="password"
            placeholder="비밀번호 확인*"
            {...register("password2", {
              required: "비밀번호를 입력해주세요",
              validate: (value) =>
                getValues("password") === value ||
                "비밀번호가 일치하지 않습니다",
            })}
          />
          {errors?.password2?.message && (
            <span className="error">{errors?.password2?.message}</span>
          )}
          <input
            type="text"
            placeholder="이름*"
            {...register("name", {
              required: "이름을 입력해주세요",
              pattern: {
                value: nameRegex,
                message: "이름은 2~10자의 한글만 사용 가능합니다",
              },
            })}
          />
          {errors?.name?.message && (
            <span className="error">{errors?.name?.message}</span>
          )}
          <input
            type="text"
            placeholder="닉네임*"
            {...register("nickname", {
              required: "닉네임을 입력해주세요",
              pattern: {
                value: nicknameRegex,
                message: "닉네임은 2~10자의 한글, 영문, 숫자만 사용 가능합니다",
              },
            })}
          />
          {errors?.nickname?.message && (
            <span className="error">{errors?.nickname?.message}</span>
          )}
          <input
            type="tel"
            placeholder="휴대전화번호*"
            {...register("phone", {
              required: "휴대전화번호를 입력해주세요",
              pattern: {
                value: phoneRegex,
                message: "휴대전화번호 형식이 올바르지 않습니다",
              },
            })}
          />
          {errors?.phone?.message && (
            <span className="error">{errors?.phone?.message}</span>
          )}
          <div className="form-group">
            <input
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: emailRegex,
                  message: "이메일 형식이 올바르지 않습니다",
                },
                onChange: () => {
                  setEmailVerified(false);
                  setAuthNum(false);
                },
              })}
            />
            <button
              type="button"
              onClick={() => requestAuthNum(getValues("email"))}
              disabled={isResendDisabled}
            >
              인증번호 전송
            </button>
          </div>
          {errors?.email?.message && (
            <span className="error">{errors?.email?.message}</span>
          )}
          {authNum && (
            <span className="green success">인증번호가 전송되었습니다</span>
          )}
          <div className="form-group">
            <div className="number-container">
              <input
                type="number"
                placeholder="인증번호*"
                {...register("number", {
                  validate: () => isEmailVerified || "이메일 인증을 해주세요",
                })}
              />
              <span className="green">{formatTime(timer)}</span>
            </div>
            <button
              type="button"
              onClick={() => checkAuthNum(getValues("number"))}
            >
              인증 확인
            </button>
          </div>
          <span className="error">{errors?.number?.message}</span>
          {isEmailVerified && (
            <span className="green success">인증이 완료되었습니다</span>
          )}
          <button type="submit" className="auth-button">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
};
export default SignUpPage;
