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

const Comment = ({ comment }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isOpen) {
      if (event.currentTarget instanceof HTMLDivElement) {
        event.currentTarget.style.width = "40px";
        event.currentTarget.style.height = "40px";
        event.currentTarget.style.borderRadius = "50%";
        event.currentTarget.style.overflow = "hidden";
      }
      setIsOpen(false);
    } else if (event.currentTarget instanceof HTMLDivElement) {
      event.currentTarget.style.width = "140px"; // Adjust the expanded width
      event.currentTarget.style.height = "100px"; // Adjust the expanded width
      event.currentTarget.style.borderRadius = "10%"; // Remove roundedness
      event.currentTarget.style.overflow = "visible"; // Show hidden content
      setIsOpen(true);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        left: comment.locationX,
        top: comment.locationY,
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        backgroundColor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        overflow: "hidden", // Hide overflow content
        transition: "width 0.3s, height 0.3s, border-radius 0.3s", // Smooth transition effect
      }}
      onClick={(e) => handleMouseClick(e)}
      // onMouseLeave={(e) => handleMouseLeave(e)}
    >
      <div className={`text-white text-[12px] ${isOpen ? "block" : "hidden"}`}>
        <p className="absolute top-2 left-2">Rahul</p>
        <p style={{ fontSize: "12px" }}>{comment.content}</p>
      </div>
      <p className={`text-white ${!isOpen ? "block" : "hidden"}`}>A</p>
    </div>
  );
};

interface MyContextProps {
  comments: IComment[] | undefined;
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
  apiKey: string;
}

export const CommentsContext = createContext<MyContextProps | null>(null);

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({
  children,
  apiKey,
}: {
  children: ReactNode;
  apiKey: string;
}) => {
  const [comments, setComments] = useState<IComment[] | undefined>();
  const [latestActivityFromSocket, setLatestActivityFromSocket] = useState();
  const [socket] = useSocketForComments(setLatestActivityFromSocket);
  const [isChecked, setIsChecked] = useState(false);

  const [hoveredCommentId, setHoveredCommentId] = useState<string | null>(null);

  const page = window.location.href;

  useEffect(() => {
    (async () => {
      const res = await fetchComments(apiKey, page);
      setComments(res.data as IComment[]);
    })();
  }, [apiKey, window.location.href]);

  useEffect(() => {
    if (latestActivityFromSocket) {
      setComments((comments) => {
        return [...(comments as IComment[]), latestActivityFromSocket];
      });
    }
  }, [latestActivityFromSocket]);

  const RenderComments: React.FC = () => {
    return (
      <div className="z-10">
        <ul>
          {comments?.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))}
        </ul>
      </div>
    );
  };

  return (
    <CommentsContext.Provider value={{ comments, setComments, apiKey }}>
      <ToggleButton isChecked={isChecked} setIsChecked={setIsChecked} />
      {isChecked && (
        <>
          <CommentCreator />
          <RenderComments />
        </>
      )}
      {children}
    </CommentsContext.Provider>
  );
};
