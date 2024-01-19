import axios from "axios";

// 채팅 목록
export const readChatList = async () => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("api/chat/room/read/chat", {
      headers,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
