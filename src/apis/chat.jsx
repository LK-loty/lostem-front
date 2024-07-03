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
  const accessToken = localStorage.getItem("act");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await axios.get(`api/chat/room/read/${roomId}`, {
    headers,
  });

  return response;
};

// 채팅방의 전체 메시지 조회
export const readMessages = async (roomId) => {
  const accessToken = localStorage.getItem("act");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await axios.get(`/api/chat/get/room/${roomId}`, {
    headers,
  });

  return response;
};

// 채팅 방 개설
export const createRoom = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    console.log(data);

    const response = await axios.post("/api/chat/room/create", data, {
      headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 본인의 게시글에 속한 채팅목록 조회
export const readMyChatList = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = axios.get("/api/chat/get/list", {
      headers: headers,
      params: data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 해당 게시글에 사용자가 참여한 채팅방 유무 조회
export const readMyRoomId = async (data) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get("/api/chat/get/post", {
      headers: headers,
      params: data,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};

// 해당 게시글에 대한 채팅 잠여자 리스트 조회
export const readChatMembers = async (postId, type) => {
  try {
    const accessToken = localStorage.getItem("act");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await axios.get(`/api/${type}/chat/${postId}`, {
      headers: headers,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
