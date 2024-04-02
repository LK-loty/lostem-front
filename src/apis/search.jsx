import axios from "axios";

// 게시글 검색 - 잃어버렸어요
export const searchLost = async (data) => {
  try {
    const response = await axios.get("api/lost/search", {
      params: data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 게시글 검색 - 주인을찾아요
export const searchFound = async (data) => {
  try {
    const response = await axios.get("api/found/search", { params: data });
    return response;
  } catch (error) {
    return error.response;
  }
};
