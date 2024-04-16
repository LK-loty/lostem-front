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

// 유저 프로필 받아오기
export const previewUser = async (tag) => {
  try {
    const params = { tag: tag };
    const response = await axios.get("/api/users/preview", {
      params,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 마이페이지 사용자 프로필
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

export const getUserLostPost = async (tag) => {
  try {
    const params = { tag: tag };
    const response = await axios.get("/api/lost/read/user", { params });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getUserFoundPost = async (tag) => {
  try {
    const params = { tag: tag };
    const response = await axios.get("/api/found/read/user", { params });
    return response;
  } catch (error) {
    return error.response;
  }
};

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
