export default function authHeader() {
  const token = localStorage.getItem("token");
  console.log("TOKEN",token);

  if (token) {
    return "Bearer " + token;
  } else {
    return {};
  }
}
