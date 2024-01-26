import axios from "axios";

// 채팅 목록
export const readChatList = async () => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("api/chat/room/read/user", {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 특정 채팅방 조회
export const readChatRoom = async (roomId) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(`api/chat/room/read/${roomId}`, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
