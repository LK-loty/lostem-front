// 로그인 상태 확인
export const isLogin = () => {
  console.log(!!localStorage.getItem("act"));
  return !!localStorage.getItem("act");
};
