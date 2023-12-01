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
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="logo">
        <Link to="/">
          <span className="green">Lost</span>em
        </Link>
      </div>
      <div className="auth-subtitle">
        가입하신 아이디와 이메일을 입력해주세요.
      </div>
      <input
        type="text"
        placeholder="아이디"
        {...register("username", { required: "아이디를 입력해주세요" })}
      />
      <span className="error">{errors?.username?.message}</span>
      <div className="phone-container">
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
        아이디가 기억나지 않는다면?{" "}
        <Link className="find-id" to="/findid">
          아이디 찾기
        </Link>
      </div>
    </form>
  );
};
export default FindPasswordPage;
