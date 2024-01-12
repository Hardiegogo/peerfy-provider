import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchComments } from "../services/comment-services/fetchComments";
import CommentCreator from "../components/CommentCreator/CommentCreator";
import { IComment } from "./types";
import useSocketForComments from "../hooks/useSocketForComments";
import ToggleButton from "../components/ToggleButton/ToggleButton";

interface MyContextProps {
  comments: IComment[] | undefined;
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
}

export const CommentsContext = createContext<MyContextProps | null>(null);

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<IComment[] | undefined>();
  const [latestActivityFromSocket, setLatestActivityFromSocket] = useState();
  const [socket] = useSocketForComments(setLatestActivityFromSocket);
  const [isChecked, setIsChecked] = useState(false);

  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);

  const handleMouseEnter = (
    commentId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setHoveredCommentId(commentId);
    if (event.currentTarget instanceof HTMLDivElement) {
      event.currentTarget.style.width = "140px"; // Adjust the expanded width
      event.currentTarget.style.height = "100px"; // Adjust the expanded width
      event.currentTarget.style.borderRadius = "10%"; // Remove roundedness
      event.currentTarget.style.overflow = "visible"; // Show hidden content
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setHoveredCommentId(null);
    if (event.currentTarget instanceof HTMLDivElement) {
      event.currentTarget.style.width = "40px";
      event.currentTarget.style.height = "40px";
      event.currentTarget.style.borderRadius = "50%";
      event.currentTarget.style.overflow = "hidden";
    }
  };

  useEffect(() => {
    (async () => {
      const res = await fetchComments();
      setComments(res.data as IComment[]);
    })();
  }, []);

  useEffect(() => {
    if (latestActivityFromSocket) {
      setComments((comments) => {
        return [...(comments as IComment[]), latestActivityFromSocket];
      });
    }
  }, [latestActivityFromSocket]);

  const RenderComments: React.FC = () => {
    return (
      <div>
        <ul>
          {comments?.map((comment) => (
            <div
              key={comment._id}
              style={{
                position: "absolute",
                left: comment.locationX,
                top: comment.locationY,
                width: "40px", // Adjust the initial width as needed
                height: "40px", // Adjust the initial height as needed
                borderRadius: "50%", // Make it a circle
                backgroundColor: "black",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                overflow: "hidden", // Hide overflow content
                transition: "width 0.3s, height 0.3s, border-radius 0.3s", // Smooth transition effect
              }}
              onMouseEnter={(e) => handleMouseEnter(comment._id, e)}
              onMouseLeave={(e) => handleMouseLeave(e)}
            >
              <div
                style={{
                  color: "#ffffff",
                  margin: 0,
                  padding: 2,
                  display: hoveredCommentId === comment._id ? "block" : "none",
                }}
              >
                <p>Shivank</p>
                <p style={{ fontSize: "14px" }}>{comment.content}</p>
              </div>
              <p
                style={{
                  color: "#ffffff",
                  margin: 0,
                  display: hoveredCommentId !== comment._id ? "block" : "none",
                }}
              >
                S
              </p>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      <ToggleButton isChecked={isChecked} setIsChecked={setIsChecked} />
      {children}
      <CommentCreator />
      {isChecked && (
        <>
          <RenderComments />
        </>
      )}
    </CommentsContext.Provider>
  );
};
