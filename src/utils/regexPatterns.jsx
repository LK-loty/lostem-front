// 아이디
export const usernameRegex = /^[a-zA-Z0-9]{5,20}$/;

// 이름
export const nameRegex = /^[가-힣]{2,10}$/;

// 비밀번호
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;

// 닉네임
export const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;

// 이메일
export const emailRegex =
  /^(?=.{1,30}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// 휴대전화번호
export const phoneRegex = /^010[0-9]{3,4}[0-9]{4}$/;
