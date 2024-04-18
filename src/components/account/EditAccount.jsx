import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateProfile, getUserProfile } from "../../apis/user";

const EditAccount = () => {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", data.profile);

      delete data.profile;

      const JSONData = JSON.stringify(data);

      formData.append(
        "data",
        new Blob([JSONData], { type: "application/json" })
      );

      const response = await updateProfile(formData);
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.error("프로필 업데이트 에러:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        if (response.status === 200) {
          const profile = response.data; // 프로필 데이터

          setValue("username", profile.username);
          setValue("name", profile.name);
          setValue("nickname", profile.nickname);
          setValue("phone", profile.phone);
          setValue("email", profile.email);
        }
      } catch (error) {
        console.error("프로필 가져오기 에러:", error);
      }
    };

    fetchProfile();
  }, [setValue]);

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
        <label htmlFor="username">아이디</label>
        <input {...register("username")} type="text" id="username" disabled />
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
