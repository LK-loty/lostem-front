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
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get("/api/logout", { headers });

    return response;
  } catch (error) {
    return error.response;
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

// 메일 인증번호 발송 - 아이디/비밀번호 찾기
export const sendMail = async (email) => {
  try {
    const data = { email: email };
    const response = await axios.post("/api/mail/request", data);

    return response.status;
  } catch (error) {
    return error.response.status;
  }
};

// 메일 인증번호 발송 - 회원가입
export const sendSignMail = async (email) => {
  try {
    const data = { email: email };
    const response = await axios.post("/api/mail/sign", data);

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

// 아이디 찾기
export const findId = async (data) => {
  try {
    const response = await axios.post("/api/mail/find", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 비밀번호 재설정
export const resetPassword = async (data) => {
  try {
    const response = await axios.post("api/mail/reset", data);
    return response;
  } catch (error) {
    return error.response;
  }
};
