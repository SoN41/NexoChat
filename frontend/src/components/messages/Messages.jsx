import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const {messages , loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({behavior : 'smooth'});
    },100)
  },[messages])

  return (
    <div className="px-4 flex-1 overflow-auto">

      {!loading && messages.length > 0 && messages.map((message) =>(
        <div key={message._id} ref={lastMessageRef}><Message key={message._id} message={message} /></div>
      ))}

      {loading && [...Array(3)].map((_ , idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-center text-gray-400 font-medium bg-gray-800/50 px-6 py-2 rounded-full border border-gray-700 shadow-sm">
            Send a message to start a conversation
          </p>
        </div>
      )}
    </div>
  )
}

export default Messages