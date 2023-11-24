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
