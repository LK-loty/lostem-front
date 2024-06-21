import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { resetPassword } from "../../../apis/auth";
import { passwordRegex } from "../../../utils/regexPatterns";

const ResetPasswordModal = ({ username }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await resetPassword({ username, ...data });

    if (response.status === 200) {
      navigate("/login");
    } else {
      setError("password", {
        type: "custom",
        message: "비밀번호 재설정에 실패했습니다. 다시 시도해주세요",
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p className="modal-title">비밀번호 재설정</p>
          <form className="post-report" onSubmit={handleSubmit(onSubmit)}>
            <input
              type="password"
              placeholder="새 비밀번호"
              {...register("password", {
                required: "새 비밀번호를 입력해주세요",
                pattern: {
                  value: passwordRegex,
                  message: "비밀번호는 6~20자의 영문과 숫자만 사용 가능합니다",
                },
              })}
            />
            <span className="error">{errors?.password?.message}</span>
            <input
              type="password"
              placeholder="비밀번호 확인"
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해주세요.",
                validate: (value) =>
                  value === getValues("password") ||
                  "비밀번호가 일치하지 않습니다.",
              })}
            />
            <span className="error">{errors?.confirmPassword?.message}</span>
            <div className="modal-button">
              <button onClick={onclose} className="cancel-button">
                취소
              </button>
              <button type="submit" className="confirm-button">
                재설정
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
