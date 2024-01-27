import { useEffect } from "react";
import useSocket from "./useSocket";

const useSocketForComments = (
  setLatestActivityFromSocket: React.Dispatch<React.SetStateAction<undefined>>,
  apiKey: string
) => {
  const [socket] = useSocket("https://peerfy-backend.onrender.com/");
  useEffect(() => {
    defineEvents();
  }, []);

  const defineEvents = () => {
    console.log("socket run");
    if (socket.current) {
      socket?.current.on("connect", () => {
        if (socket.current) {
          socket.current.emit("join", {
            apiKey,
          });
        }
        console.log(
          "%cJOINED SOCKET FOR Comments",
          "background: #00ddd0; color: #000; font-weight: 600;"
        );
      });

      socket.current.on("connect_failed", () => {
        console.log(
          "%cFAILED TO CONNECT SOCKET FOR ACTIVITY",
          "background: #ff8888; color: #000; font-weight: 600;"
        );
      });

      socket.current.on("new-comment", (value) => {
        console.log(value);
        setLatestActivityFromSocket(value.comment);
      });
    }
  };

  return [socket];
};

export default useSocketForComments;
