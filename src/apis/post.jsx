import axios from "axios";

// 글작성
export const createPost = async (data, type) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(`/api/${type}/create`, data, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 글목록 조회
export const readPost = async (page, type) => {
  try {
    const response = await axios.get(`/api/${type}/read`, {
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

// 글 내용 조회
export const readPostDetail = async (postId, type) => {
  try {
    const response = await axios.get(`/api/${type}/read/${postId}`);
    return response;
  } catch (error) {
    console.log("readLostDetail api 에러", error);
    return error.response;
  }
};

// 글 수정
export const updatePost = async (data, type) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.patch(`/api/${type}/update`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 글 상태 수정
export const updatePostState = async (data, type) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.patch(`/api/${type}/change`, data, {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

// 글 삭제
export const deletePost = async (postId, type) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const config = {
      headers: headers,
    };

    const response = await axios.delete(
      `/api/${type}/delete/${postId}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

// 게시글 검색
export const searchPost = async (data, type) => {
  try {
    const response = await axios.get(`api/${type}/search`, {
      params: data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
