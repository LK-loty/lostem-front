import axios from "axios";

export const createReview = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("api/review/create", data, { headers });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const readReview = async (tag) => {
  try {
    const response = await axios.get(`api/review/read/${tag}`);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteReview = async (reviewId) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const config = {
      headers: headers,
    };

    const response = await axios.delete(
      `api/review/delete/${reviewId}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
