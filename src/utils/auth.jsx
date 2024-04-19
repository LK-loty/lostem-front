import { updateToken } from "../apis/auth";

// 로그인 상태 확인
export const isLogin = () => {
  console.log(!!localStorage.getItem("act"));
  return !!localStorage.getItem("act");
};

export const checkAccessToken = () => {
  const accessToken = localStorage.getItem("act");

  if (!accessToken) {
    console.log("No Access Token");
    return;
  }

  try {
    const tokenParts = accessToken.split(".");
    if (tokenParts.length !== 3) {
      throw new Error("Invalid Access Token format");
    }

    const decodedPayload = JSON.parse(atob(tokenParts[1])); // 토큰 payload 부분 디코딩

    const expirationTime = decodedPayload.exp * 1000; // 밀리초로 변환
    const currentTime = new Date().getTime();

    const bufferTime = 5 * 60 * 1000; // 5분 여유 시간 설정 (밀리초)

    if (currentTime + bufferTime > expirationTime) {
      // 토큰 만료 시간이 현재 시간 + 여유 시간보다 이전일 경우 서버에 재발급 요청
      updateToken().then((response) => console.log(response));
    } else {
      console.log("Access Token 유효");
    }
  } catch (error) {
    console.error("Access Token 디코딩 오류 => ", error);
  }
};
