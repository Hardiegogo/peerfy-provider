import { useEffect } from "react";
import useSocket from "./useSocket";

const useSocketForComments = (setLatestActivityFromSocket: any) => {
  const [socket] = useSocket("http://localhost:3000/");
  useEffect(() => {
    defineEvents();
  }, []);

  const defineEvents = () => {
    console.log("socket run");

    socket?.current.on("connect", () => {
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
      setLatestActivityFromSocket(value.comment);
    });
  };

  return [socket];
};

export default useSocketForComments;
