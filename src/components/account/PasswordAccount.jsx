import { useForm } from "react-hook-form";
import { changePassword } from "../../apis/user";
import { passwordRegex } from "../../utils/regexPatterns";

const PasswordAccount = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    delete data.word2;

    const response = await changePassword(data);
    if (response.status === 200) window.location.reload();
  };

  return (
    <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="word">비밀번호</label>
        <input
          {...register("word", {
            required: "비밀번호를 입력해주세요",
            pattern: {
              value: passwordRegex,
              message: "비밀번호는 6~20자의 영문과 숫자만 사용 가능합니다",
            },
          })}
          type="password"
          id="word"
        />
        {errors?.word?.message && (
          <span className="error">{errors?.word?.message}</span>
        )}
      </div>
      <div>
        <label htmlFor="word2">비밀번호 확인</label>
        <input
          {...register("word2", {
            required: "비밀번호를 입력해주세요",
            validate: (value) =>
              getValues("word") === value || "비밀번호가 일치하지 않습니다",
          })}
          type="password"
          id="word2"
        />
        {errors?.word2?.message && (
          <span className="error">{errors?.word2?.message}</span>
        )}
      </div>
      <button type="submit" className="auth-button">
        변경하기
      </button>
    </form>
  );
};
export default PasswordAccount;
