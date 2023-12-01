import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../apis/auth";
import ImgLoty from "../../assets/images/img_loty.png";

const LogInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => login(data);

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <Link to="/">
        <img src={ImgLoty} />
      </Link>
      <span className="green">로그인</span>
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
      <span className="error">{errors?.password?.message}</span>
      <button type="submit" className="login-button">
        로그인
      </button>
      <div className="login-more">
        <Link to="/">아이디찾기</Link>
        <span className="thin-font">|</span>
        <Link to="/">비밀번호찾기</Link>
        <span className="thin-font">|</span>
        <Link to="/">회원가입</Link>
      </div>
    </form>
  );
};
export default LogInPage;
