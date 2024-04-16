import axios from "axios";

// 글작성 - 잃어버렸어요
export const postLost = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("/api/lost/create", data, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 글작성 - 주인을찾아요
export const postFound = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("/api/found/create", data, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 글목록 조회 - 잃어버렸어요
export const readLost = async (page) => {
  try {
    const response = await axios.get("/api/lost/read", {
      params: {
        page: page - 1,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("readPost api 에러:", error);
    return error.response;
  }
};

// 글목록 조회 - 주인을찾아요
export const readFound = async (page) => {
  try {
    const response = await axios.get("/api/found/read", {
      params: {
        page: page - 1,
      },
    });
    return response;
  } catch (error) {
    console.log("readFound api 에러:", error);
    return error.response;
  }
};

// 글 자세히 - 잃어버렸어요
export const readLostDetail = async (postId) => {
  try {
    const response = await axios.get(`/api/lost/read/${postId}`, {});
    return response;
  } catch (error) {
    console.log("readLostDetail api 에러", error);
    return error.response;
  }
};

// 글 자세히 - 주인을찾아요
export const readFoundDetail = async (postId) => {
  try {
    const response = await axios.get(`/api/found/read/${postId}`, {});
    return response;
  } catch (error) {
    console.log("readFoundDetail api 에러", error);
    return error.response;
  }
};

// 글 수정 - 주인을찾아요
export const updateFound = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.patch("/api/found/update", data, { headers });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 글 수정 - 잃어버렸어요
export const updateLost = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.patch("/api/lost/update", data, { headers });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 글 상태 수정 - 주인을찾아요
export const updateFoundState = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.patch("/api/found/change", data, { headers });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 글 상태 수정 - 잃어버렸어요
export const updateLostState = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.patch("/api/lost/change", data, { headers });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 글 삭제
export const deleteFound = async (postId) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const config = {
      headers: headers,
    };

    const response = await axios.delete(`/api/found/delete/${postId}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 글 삭제
export const deleteLost = async (postId) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const config = {
      headers: headers,
    };

    const response = await axios.delete(`/api/lost/delete/${postId}`, config);
    return response;
  } catch (error) {
    return error.response;
  }
};

// 평가글 작성
export const writeReview = async (data, type) => {
  try {
    const response = await axios.post(``);
    return response;
  } catch (error) {
    console.log("평가글 작성 api 에러 => ", error);
    return error.response;
  }
};
