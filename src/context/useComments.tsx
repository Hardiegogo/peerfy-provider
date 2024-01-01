import { ReactNode, createContext, useContext, useState } from "react";

interface IComment {
  content: string;
}

interface MyContextProps {
  comments: IComment[];
  setComments: React.Dispatch<React.SetStateAction<IComment[] | undefined>>;
}

export const CommentsContext = createContext<MyContextProps | null>(null);

export const useComments = () => {
  return useContext(CommentsContext);
};

// comments= [
//     []
// ]

export const CommentsProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<IComment[]>();

  return (
    <CommentsContext.Provider value={{ comments, setComments }}>
      {children}
    </CommentsContext.Provider>
  );
};
