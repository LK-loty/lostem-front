import axios from "axios";

// 게시글 검색 - 잃어버렸어요
export const searchLost = async (data) => {
  try {
    const response = await axios.post("api/lost/search", data);

    return response;
  } catch (error) {
    return error.response;
  }
};

// 게시글 검색 - 주인을찾아요
export const searchFound = async (data) => {
  try {
    const response = await axios.post("api/found/search", data);

    return response;
  } catch (error) {
    return error.response;
  }
};
