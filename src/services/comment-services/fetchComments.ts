import axios from "axios";

export const fetchComments = async (apiKey: string) => {
  const headers = {
    apiKey,
  };

  const res = await axios.get(
    "https://peerfy-backend.onrender.com/api/v1/comment",
    { headers }
  );
  return res;
};
