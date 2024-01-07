import axios from "axios";

export const fetchComments = async () => {
  const res = await axios.get("http://localhost:3000/api/v1/comment/");
  return res;
};
