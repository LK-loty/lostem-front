import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../apis/auth";

const LogInPage = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result) {
      // 로그인이 성공하면 이전 페이지로 이동
      navigate(-1);
    } else {
      setLoginError(true);
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
          <input
            type="text"
            placeholder="아이디"
            {...register("username", { required: "아이디를 입력해주세요" })}
          />
          <span className="error">{errors?.username?.message}</span>
          <input
            type="password"
            placeholder="비밀번호"
            {...register("password", { required: "비밀번호를 입력해주세요" })}
          />
          {errors?.password && (
            <span className="error">{errors?.password?.message}</span>
          )}
          {loginError && (
            <span className="error">
              아이디 또는 비밀번호가 틀렸습니다. 다시 입력해주세요.
            </span>
          )}
          <button type="submit" className="auth-button">
            로그인
          </button>
          <div className="login-more">
            <Link to="/findid">아이디찾기</Link>
            <span className="thin-font">|</span>
            <Link to="/findpassword">비밀번호찾기</Link>
            <span className="thin-font">|</span>
            <Link to="/signup">회원가입</Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LogInPage;
