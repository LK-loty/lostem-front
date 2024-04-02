import axios from "axios";

// 키워드 추가
export const addKeyword = async (keyword) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const data = { keyword: keyword };

    const response = await axios.post("api/keyword/create", data, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 키워드 조회
export const readKeyword = async () => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get("/api/keyword/read", {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 키워드 수정
export const updateKeyword = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.patch("api/keyword/update", data, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 키워드 삭제
export const deleteKeyword = async (keyword) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const config = {
      headers: headers,
      data: { keyword: keyword },
    };

    const response = await axios.delete("api/keyword/delete", config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 키워드 검색
export const searchKeyword = async () => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get("/api/keyword/search", {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
