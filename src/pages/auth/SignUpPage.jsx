import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signup, checkUsername } from "../../apis/user";
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
  const [authNum, setAuthNum] = useState(""); // 인증번호
  const [isPhoneVerified, setPhoneVerified] = useState(false); // 인증 확인
  const [timer, setTimer] = useState();

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
  const requestAuthNum = (phone) => {
    if (!phone) {
      setError("phone", {
        type: "required",
        message: "휴대전화번호를 입력해주세요",
      });
      return;
    } else if (!phoneRegex.test(phone)) {
      setError("phone", {
        type: "pattern",
        message: "휴대전화번호 형식이 올바르지 않습니다",
      });
      return;
    }

    clearErrors("phone");
    setAuthNum("123");
  };

  // 인증 확인
  // 3분 타이머 추가
  const checkAuthNum = (number) => {
    if (!authNum) {
      setError("number", {
        type: "required",
        message: "인증번호를 입력해주세요",
      });
      return;
    }

    if (authNum === number) {
      clearErrors("number");
      setPhoneVerified(true);
    } else {
      setError("number", {
        type: "pattern",
        message: "인증번호가 올바르지 않습니다",
      });
      setPhoneVerified(false);
    }
  };

  const onSubmit = async (data) => {
    const result = await signup(data);
    if (result) {
      // 회원가입 성공시 이전 페이지로 이동
      navigate(-1);
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
            type="text"
            placeholder="이메일"
            {...register("email", {
              pattern: {
                value: emailRegex,
                message: "이메일 형식이 올바르지 않습니다",
              },
            })}
          />
          {errors?.email?.message && (
            <span className="error">{errors?.email?.message}</span>
          )}
          <div className="form-group">
            <input
              type="tel"
              placeholder="휴대전화번호*"
              {...register("phone", {
                required: "휴대전화번호를 입력해주세요",
                pattern: {
                  value: phoneRegex,
                  message: "휴대전화번호 형식이 올바르지 않습니다",
                },
                onChange: () => {
                  setPhoneVerified(false);
                  setAuthNum("");
                },
              })}
            />
            <button
              type="button"
              onClick={() => requestAuthNum(getValues("phone"))}
            >
              인증번호 전송
            </button>
          </div>
          {errors?.phone?.message && (
            <span className="error">{errors?.phone?.message}</span>
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
                  validate: () =>
                    isPhoneVerified || "휴대전화번호 인증을 해주세요",
                })}
              />
              <span className="green">00:00</span>
            </div>
            <button
              type="button"
              onClick={() => checkAuthNum(getValues("number"))}
            >
              인증 확인
            </button>
          </div>
          <span className="error">{errors?.number?.message}</span>
          {isPhoneVerified && (
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
