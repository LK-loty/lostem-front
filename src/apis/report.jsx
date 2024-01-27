import axios from "axios";

// 잃어버렸어요 게시글 신고
export const reportLost = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("api/reports/lost", data, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 주인을찾아요 게시글 신고
export const reportFound = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("api/reports/lost", data, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
