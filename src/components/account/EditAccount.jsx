import { useForm } from "react-hook-form";
import { updateProfile } from "../../apis/user";

const EditAccount = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await updateProfile(data);
      if (response.status === 200) {
        // 프로필 업데이트 성공 처리
        console.log(response);
      }
    } catch (error) {
      console.error("프로필 업데이트 에러:", error);
    }
  };

  return (
    <form className="account-form" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="profile">프로필사진</label>
        <input
          {...register("profile")}
          type="file"
          accept="image/*"
          id="profile"
        />
      </div>
      <div>
        <label htmlFor="id">아이디</label>
        <input {...register("id")} type="text" id="id" disabled />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input {...register("password")} type="password" id="password" />
      </div>
      <div>
        <label htmlFor="name">이름</label>
        <input {...register("name")} type="text" id="name" />
      </div>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input {...register("nickname")} type="text" id="nickname" />
      </div>
      <div>
        <label htmlFor="phone">휴대전화번호</label>
        <input {...register("phone")} type="tel" id="phone" disabled />
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <input {...register("email")} type="email" id="email" disabled />
      </div>
      <button type="submit" className="auth-button">
        수정하기
      </button>
    </form>
  );
};

export default EditAccount;
