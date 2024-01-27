import { useState } from "react";
import Comment from "../Comment";
import ContextMenu from "../ContextMenu/ContextMenu";
import "../CommentCreator/commentCreator.css";
import { postComment } from "../../services/comment-services/postComment";
import { useComments } from "../../context/useComments";

const RenderComments: React.FC = ({ comments }) => {
  const [isInputVisible, setInputVisible] = useState(false);
  const { apiKey } = useComments();

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
    console.log("event", e);
    setCoordinates({ x: e.pageX, y: e.pageY });
    showContextMenu(e.pageX, e.pageY);
    console.log("click");
  };

  const handleContextMenuOption = () => {
    hideContextMenu();
    setInputVisible(true);
  };

  const handleCommentCreate = () => {
    const fullWidth = document.documentElement.clientWidth;
    const fullHeight = document.documentElement.clientHeight;
    postComment(
      commentContent,
      `${coordinates.x / fullWidth}`,
      `${coordinates.y / fullHeight}`,
      "User123",
      apiKey,
      window.location.origin + window.location.pathname
    );
    console.log(commentContent);
    setCommentContent("");
    setInputVisible(false);
  };
  return (
    <div className="absolute z-10 w-full h-full">
      <ul>
        {comments
          ?.filter(
            (comment) =>
              comment?.urlPath ===
              window.location.origin + window.location.pathname
          )
          .map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
      </ul>
      <div
        onClick={() => {
          hideContextMenu();
        }}
        className="w-full h-full"
        onContextMenu={handlePageClick}
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
    </div>
  );
};

export default RenderComments;
