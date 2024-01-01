import { useEffect} from "react"
import useSocket from "./useSocket"



const useSocketForLiveChat = (setLatestActivityFromSocket:any) => {

  const [socket] = useSocket("dummy url")
  useEffect(() => {
    defineEvents()
  }, [])

  const defineEvents = () => {
    console.log("socket run")

    // socket.current.on("connect", () => {
    //   console.log("%cJOINED SOCKET FOR Chat", "background: #00ddd0; color: #000; font-weight: 600;")
    // })

    // socket.current.on("connect_failed", () => {
    //   console.log("%cFAILED TO CONNECT SOCKET FOR ACTIVITY", "background: #ff8888; color: #000; font-weight: 600;")
    // })
    
  }

  return [socket]
}

export default useSocketForLiveChat