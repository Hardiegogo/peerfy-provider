import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchComments } from "../services/comment-services/fetchComments";
import { IComment } from "./types";
import useSocketForComments from "../hooks/useSocketForComments";
import ToggleButton from "../components/ToggleButton/ToggleButton";
import RenderComments from "../components/RenderComments/RenderComments";

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
  const [socket] = useSocketForComments(setLatestActivityFromSocket, apiKey);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetchComments(apiKey);
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

  return (
    <CommentsContext.Provider value={{ comments, setComments, apiKey }}>
      <ToggleButton isChecked={isChecked} setIsChecked={setIsChecked} />
      {isChecked && (
        <>
          <RenderComments comments={comments} />
        </>
      )}
      {children}
    </CommentsContext.Provider>
  );
};
