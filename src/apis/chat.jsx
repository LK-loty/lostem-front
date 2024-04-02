import axios from "axios";

// 채팅방 목록
export const readChatList = async () => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get("api/chat/room/read/user", {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 특정 채팅방 정보조회
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

// 채팅방의 전체 메시지 조회
export const readMessages = async (roomId) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(`/api/chat/get/room/${roomId}`, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 채팅 방 개설
export const createRoom = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.post("/api/chat/room/create", data, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
