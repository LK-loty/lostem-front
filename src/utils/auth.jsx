// 로그인 상태 확인
export const isLogin = () => {
  return !!localStorage.getItem("act");
};
