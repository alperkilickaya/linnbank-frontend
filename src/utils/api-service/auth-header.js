export default function authHeader() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) {
    return `Bearer ${token}`;
    // return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}
