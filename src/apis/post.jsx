import axios from "axios";

// 글작성 - 잃어버렸어요
export const postLost = async (data) => {
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

    if (response.status === 200) return true;
    else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 잃어버렸어요 글목록 조회
export const readPost = async () => {
  try {
    const response = await axios.get("api/lost/read");
    if (response.status === 200) {
      return response.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log("readPost api 에러:", error);
    return false;
  }
};
