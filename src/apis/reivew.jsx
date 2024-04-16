import axios from "axios";

export const createReview = async (data) => {
  try {
    const response = await axios.post("api/review/create", data);
    return response;
  } catch (error) {
    return error.response;
  }
};

export const readReview = async (tag) => {
  try {
    const params = { tag: tag };
    const response = await axios.get("api/review/read", { params });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const deleteReviewe = async (reviewId) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const config = {
      headers: headers,
      data: { reviewId: reviewId },
    };

    const response = await axios.delete("api/review/delete", config);
    return response;
  } catch (error) {
    return error.response;
  }
};
