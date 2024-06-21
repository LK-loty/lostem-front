import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { sendMail, findId } from "../../apis/auth";
import Modal from "../../components/common/Modal";

const FindIdPage = () => {
  const {
    register,
    getValues,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isResendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    // 타이머 기능 추가
    let interval;

    if (timer >= 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0; // 타이머 초기값으로 재설정
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 해제
  }, [timer]);

  const handleModalClose = () => {
    setModalOpen(false);
    navigate("/login");
  };

  // 시간을 "mm:ss" 형식으로 포맷하는 함수
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const onSubmit = async (data) => {
    if (timer === 0) {
      setError("authCode", {
        type: "custom",
        message: "인증 시간이 만료되었습니다",
      });
      return;
    }

    const response = await findId(data);

    if (response.status === 200) {
      clearErrors("authCode");
      setId(response.data);
      setModalOpen(true);
    } else {
      setError("authCode", {
        type: "pattern",
        message: "인증번호가 올바르지 않습니다",
      });
    }
  };

  // 인증번호 전송
  const handleSendMail = async () => {
    if (!errors?.email) {
      const email = getValues("email");
      const response = await sendMail(email);

      if (response === 200) {
        setResendDisabled(true);
        setTimer(180);
      } else {
        setError("email", {
          type: "custom",
          message: "인증번호 전송을 실패했습니다. 다시 시도해주세요",
        });

        // setResendDisabled(false);
      }
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
        <div className="auth-wrap">
          <h2 className="auth-title">
            회원가입 시 입력하신 <br />
            이메일과 인증번호를 입력해주세요.
          </h2>
        </div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="이메일"
              {...register("email", {
                required: "이메일을 입력해주세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/,
                  message: "이메일 형식이 올바르지 않습니다.",
                },
              })}
            />
            <button
              type="button"
              onClick={handleSendMail}
              disabled={isResendDisabled}
            >
              인증번호 전송
            </button>
          </div>
          <span className="error">{errors?.email?.message}</span>
          <div className="number-container">
            <input
              type="authCode"
              placeholder="인증번호*"
              {...register("authCode", {
                required: "인증번호를 입력해주세요.",
              })}
            />
            <span className="green">{formatTime(timer)}</span>
          </div>
          <span className="error">{errors?.authCode?.message}</span>
          <button type="submit" className="auth-button">
            확인
          </button>
        </form>
      </div>
      {modalOpen && (
        <Modal
          content={id}
          onClose={handleModalClose}
          title={"아이디 찾기 결과"}
        />
      )}
    </div>
  );
};
export default FindIdPage;
