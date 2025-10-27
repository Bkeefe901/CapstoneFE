import axios from "axios";

let baseURL = "https://garden-tracker-0rj8.onrender.com";

async function getUser(token) {
    
  let res = await axios.get(`${baseURL}/auth`, {
    headers: { "x-auth-token": token },
  });

  return res.data;
}

export default { getUser };