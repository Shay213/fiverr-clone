export default () => {
  const strCurrUser = localStorage.getItem("currentUser");
  const currUser = strCurrUser ? JSON.parse(strCurrUser) : null;
  return currUser;
};
