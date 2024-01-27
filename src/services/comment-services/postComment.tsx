import axios from "axios";

export const postComment = async (
  content: string,
  locationX: string,
  locationY: string,
  createdBy: string,
  apiKey: string,
  pageUrl: string
) => {
  const headers = { apiKey };

  const res = await axios.post(
    "https://peerfy-backend.onrender.com/api/v1/comment",
    {
      content,
      locationX,
      locationY,
      createdBy,
      urlPath: pageUrl,
    },
    { headers }
  );
  console.log(res);
};
