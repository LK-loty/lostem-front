import axios from "axios";

// 로그인
export const login = async (data) => {
  try {
    const response = await axios.post("/api/login", data);
    if (response.status === 200) {
      const accessToken = response.headers["authorization"];
      localStorage.setItem("act", accessToken);
      const tokenParts = accessToken.split(".");
      const decodedPayload = JSON.parse(atob(tokenParts[1]));
      localStorage.setItem("tag", decodedPayload.tag);

      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    const response = await axios.get("/api/logout");

    if (response.status === 200) {
      localStorage.removeItem("act");
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 토큰 재발급
export const updateToken = async () => {
  try {
    const response = await axios.get("/api/access");

    return response;
  } catch (error) {
    return error.response;
  }
};

// 메일 인증번호 발송
export const sendMail = async (email) => {
  try {
    const data = { email: email };
    const response = await axios.post("/api/mail/request", data);

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

// 인증번호 검사
export const checkMail = async (data) => {
  try {
    const response = await axios.post("/api/mail/validate", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
