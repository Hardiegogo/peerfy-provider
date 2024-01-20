import axios from "axios";

export const fetchComments = async (apiKey: string, page: string = "/") => {
  const headers = {
    apiKey,
    page,
  };

  const res = await axios.get(
    "https://peerfy-backend.onrender.com/api/v1/comment",
    { headers }
  );
  return res;
};
