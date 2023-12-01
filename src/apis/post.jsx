import axios from "axios";

// 글작성
export const post = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("api/posts/create", data, {
      headers,
    });

    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
