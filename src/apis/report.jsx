import axios from "axios";

// 게시글 신고
export const reportPost = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("api/reports/create", data, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
