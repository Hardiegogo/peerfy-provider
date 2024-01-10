import { useState } from "react";
import { postComment } from "../../services/comment-services/postComment";
import ContextMenu from "../ContextMenu/ContextMenu";
import "./commentCreator.css";

const CommentCreator = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  const showContextMenu = (x: number, y: number) => {
    setContextMenu({ show: true, x, y });
  };

  const hideContextMenu = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
  };

  const handlePageClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCoordinates({ x: e.pageX, y: e.pageY });
    showContextMenu(e.pageX, e.pageY);
    console.log("click");
  };

  const handleContextMenuOption = () => {
    // Implement logic based on the selected context menu option
    // For now, let's just add a comment with the option name
    hideContextMenu();
    setInputVisible(true);
  };

  const handleCommentCreate = () => {
    postComment(
      commentContent,
      `${coordinates.x}px`,
      `${coordinates.y}px`,
      "User123"
    );
    console.log(commentContent);
    setCommentContent("");
    setInputVisible(false);
  };

  return (
    <div
      onClick={() => {
        hideContextMenu();
      }}
      onContextMenu={handlePageClick}
      style={{ height: "100vh", width: "100vw", cursor: "pointer" }}
    >
      {isInputVisible && (
        <div
          className="popup-container"
          style={{ left: `${coordinates.x}px`, top: `${coordinates.y}px` }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            className="comment-input"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Type your comment here..."
          />
          <br />
          <button
            className="post-comment-btn"
            onClick={handleCommentCreate}
            disabled={commentContent === ""}
          >
            Post Comment
          </button>
        </div>
      )}
      <ContextMenu
        show={contextMenu.show}
        x={contextMenu.x}
        y={contextMenu.y}
        handleContextMenuOption={handleContextMenuOption}
      />
    </div>
  );
};

export default CommentCreator;
