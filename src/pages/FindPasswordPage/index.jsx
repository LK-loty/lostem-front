import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const FindPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

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
          <div>
            아이디가 기억나지 않는다면? &nbsp;
            <Link className="find-id" to="/findid">
              <span className="green">아이디 찾기</span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FindPasswordPage;
