import { useState } from "react";
import { postComment } from "../services/comment-services/postComment";

const CommentCreator = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const handlePageClick = (event: React.MouseEvent) => {
    setCoordinates({ x: event.pageX, y: event.pageY });
    setInputVisible(true);
    console.log("click");
  };

  const handleCommentCreate = () => {
    postComment(
      commentContent,
      `${coordinates.x}px`,
      `${coordinates.y}px`,
      "User123"
    );
    setCommentContent("");
    setInputVisible(false);
  };

  return (
    <div
      onClick={handlePageClick}
      style={{ height: "100vh", width: "100vw", cursor: "pointer" }}
    >
      {isInputVisible && (
        <div
          style={{
            position: "absolute",
            left: `${coordinates.x}px`,
            top: `${coordinates.y}px`,
            backgroundColor: "#fff",
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "1px",
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
          />
          <button onClick={handleCommentCreate}>Post Comment</button>
        </div>
      )}
    </div>
  );
};

export default CommentCreator;
