import axios from "axios";

// 회원가입
export const signup = async (data) => {
  console.log(data);
  try {
    const response = await axios.post("api/users/signup", data);
    if (response.status === 200) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

// 아이디  중복확인
export const checkUsername = async (username) => {
  try {
    const response = await axios.get("/api/users/check", {
      params: {
        username: username,
      },
    });

    if (response.status === 200) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};
