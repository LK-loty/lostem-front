import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { sendMail, checkMail, resetPassword } from "../../apis/auth";
import ResetPasswordModal from "../../components/common/Modal/ResetPasswordModal";

const FindPasswordPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const [isResendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    let interval;

    if (timer >= 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const onSubmit = async () => {
    if (timer === 0) {
      setError("authCode", {
        type: "custom",
        message: "인증 시간이 만료되었습니다",
      });
      return;
    }

    const response = await checkMail({
      email: getValues("email"),
      authCode: getValues("authCode"),
    });

    if (response.status === 200) {
      clearErrors("authCode");
      setUserEmail(getValues("email"));
      setModalOpen(true);
    } else {
      setError("authCode", {
        type: "pattern",
        message: "인증번호가 올바르지 않습니다",
      });
    }
  };

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
      }
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
            회원가입 시 입력하신
            <br /> 아이디와 이메일을 입력해주세요.
          </h2>
        </div>
        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="아이디"
            {...register("username", { required: "아이디를 입력해주세요" })}
          />
          <span className="error">{errors?.username?.message}</span>
          <div className="form-group">
            <input
              type="text"
              placeholder="이메일"
              {...register("email", { required: "이메일을 입력해주세요" })}
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
          <div>
            아이디가 기억나지 않는다면? &nbsp;
            <Link className="find-id" to="/findid">
              <span className="green">아이디 찾기</span>
            </Link>
          </div>
        </form>
      </div>
      {modalOpen && (
        <ResetPasswordModal
          username={getValues("username")}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default FindPasswordPage;
