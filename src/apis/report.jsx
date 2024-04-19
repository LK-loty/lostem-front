import axios from "axios";

// 게시글 신고
export const reportPost = async (data, type) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post(`api/reports/${type}`, data, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
