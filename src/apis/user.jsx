import axios from "axios";

// 회원가입
export const signup = async (data) => {
  try {
    const response = await axios.post("api/users/signup", data);
    if (response.status === 200) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

// 아이디 중복확인
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

// 유저 프로필 조회
export const previewUser = async (tag) => {
  try {
    const response = await axios.get(`/api/users/preview/${tag}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 사용자 정보 조회
export const getUserProfile = async () => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken},`,
    };
    const response = await axios.get("/api/users/read", { headers });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 사용자 게시글 조회
export const readUserPost = async (tag, type) => {
  try {
    const response = await axios.get(`/api/${type}/read/user/${tag}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 프로필 수정
export const updateProfile = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.patch("/api/users/update", data, { headers });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 회원 탈퇴
export const deleteAccount = async (password) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const config = {
      headers: headers,
      data: { word: password },
    };
    const response = await axios.delete("/api/users/delete", config);

    return response;
  } catch (error) {
    return error.response;
  }
};

// 비밀번호 변경
export const changePassword = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await axios.patch("/api/users/change", data, { headers });

    return response;
  } catch (error) {
    return error.response;
  }
};
