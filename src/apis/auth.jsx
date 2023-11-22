import axios from "axios";

// 로그인
export const login = async (data) => {
  try {
    const response = await axios.post("/api/login", { data });
    if (response.status === 200) {
      const accessToken = response.headers["Authorization"];
      localStorage.setItem("act", accessToken);
      return "success";
    } else return "fail";
  } catch (error) {
    return "fail";
  }
};
