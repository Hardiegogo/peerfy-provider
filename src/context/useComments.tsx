import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchComments } from "../services/comment-services/fetchComments";
import CommentCreator from "../components/CommentCreator";
import { IComment } from "./types";
import useSocketForComments from "../hooks/useSocketForComments";

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
                backgroundColor: "#3498db",
                padding: "8px",
                color: "#ffffff", // Text color
              }}
            >
              <p>{comment.content}</p>
            </div>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      {children}
      <RenderComments />
      <CommentCreator />
    </CommentsContext.Provider>
  );
};
