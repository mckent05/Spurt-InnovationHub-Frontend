const getToken = () => {
  const token = JSON.parse(localStorage.getItem("user-token"));
  return token;
};

const clearSession = () => {
  localStorage.setItem("session", false);
  localStorage.removeItem("user-token");
};

const baseURL = "http://localhost:3000/api/v1";

export { getToken, clearSession, baseURL };
