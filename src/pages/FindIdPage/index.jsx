import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./style.scss";

const FindIdPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div className="auth-container">
      <header>
        <div className="header_logo">
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
            <button type="button">인증번호 전송</button>
          </div>
          <span className="error">{errors?.email?.message}</span>
          <input
            type="text"
            placeholder="인증번호"
            {...register("number", { required: "인증번호를 입력해주세요" })}
          />
          <span className="error">{errors?.number?.message}</span>
          <button type="submit" className="auth-button">
            확인
          </button>
        </form>
      </div>
    </div>
  );
};
export default FindIdPage;
