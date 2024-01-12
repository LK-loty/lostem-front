import axios from "axios";

// 글작성 - 잃어버렸어요
export const postLost = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("api/lost/create", data, {
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

    const response = await axios.post("api/found/create", data, {
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
    const response = await axios.get("api/lost/read", {
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
    const response = await axios.get("api/found/read", {
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
