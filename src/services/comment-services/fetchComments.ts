import axios from "axios";

export const fetchComments = async () => {
  const res = await axios.get("https://peerfy-backend.onrender.com/api/v1/comment");
  return res;
};
