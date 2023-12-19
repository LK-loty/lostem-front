import axios from "axios";

// 로그인
export const login = async (data) => {
  try {
    const response = await axios.post("/api/login", data);
    if (response.status === 200) {
      const accessToken = response.headers["authorization"];
      localStorage.setItem("act", accessToken);
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
