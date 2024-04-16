export const formatRelativeDate = (time) => {
  const currentDate = new Date();
  const postDate = new Date(time);
  const timeDifference = currentDate - postDate;

  let timeDisplay;
  if (timeDifference < 60000) {
    // 1분 이내
    const seconds = Math.floor(timeDifference / 1000);
    timeDisplay = `${seconds}초 전`;
  } else if (timeDifference < 3600000) {
    // 1시간 이내
    const minutes = Math.floor(timeDifference / 60000);
    timeDisplay = `${minutes}분 전`;
  } else if (timeDifference < 86400000) {
    // 24시간 이내
    const hours = Math.floor(timeDifference / 3600000);
    timeDisplay = `${hours}시간 전`;
  } else if (timeDifference < 604800000) {
    // 7일 이내 (주 단위)
    const days = Math.floor(timeDifference / 86400000);
    timeDisplay = `${days}일 전`;
  } else if (timeDifference < 2419200000) {
    // 4주 이내 (주 단위)
    const weeks = Math.floor(timeDifference / 604800000);
    timeDisplay = `${weeks}주 전`;
  } else if (timeDifference < 31536000000) {
    // 1년 이내
    const months = Math.floor(timeDifference / 2628000000);
    timeDisplay = `${months}개월 전`;
  } else {
    // 1년 이상
    const years = Math.floor(timeDifference / 31536000000);
    timeDisplay = `${years}년 전`;
  }

  return timeDisplay;
};

export const formatDate = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}`;
  return formattedDate;
};
