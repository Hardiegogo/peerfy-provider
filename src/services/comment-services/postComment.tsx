import axios from "axios";

export const postComment = async (
  content: string,
  locationX: string,
  locationY: string,
  createdBy: string
) => {
  const res = await axios.post("https://peerfy-backend.onrender.com/api/v1/comment", {
    content,
    locationX,
    locationY,
    createdBy,
  });
  console.log(res);
};
