import axios from "axios";

export const login = (data) => {
  axios
    .post("/login", {
      data,
    })
    .then((response) => {
      if (response.status === 200) {
        const { accessToken } = response.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
      } else {
        console.log("로그인 실패");
      }
    })
    .catch((error) => {
      console.log("로그인 오류:", error);
    });
};
