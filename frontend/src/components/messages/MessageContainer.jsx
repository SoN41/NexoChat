import { useEffect, useState } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/socketContext"; // Ensure correct case

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } = useConversation();
    const { socket } = useSocketContext();
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        if (!socket) return;

        // Listen for typing events
        const handleDisplayTyping = ({ typingId }) => {
            if (selectedConversation?._id === typingId) {
                setIsTyping(true);
            }
        };

        const handleHideTyping = () => setIsTyping(false);

        socket.on("displayTyping", handleDisplayTyping);
        socket.on("hideTyping", handleHideTyping);

        return () => {
            socket.off("displayTyping", handleDisplayTyping);
            socket.off("hideTyping", handleHideTyping);
        };
    }, [socket, selectedConversation]);

    useEffect(() => {
        // Cleanup function (unmounts component)
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Header */}
                    <div className="bg-slate-500 px-4 py-2 mb-2 flex flex-col">
                        <div>
                            <span className="label-text">To: </span>{" "}
                            <span className="text-gray-900 font-bold">
                                {selectedConversation.isGroupChat 
                                    ? selectedConversation.groupName 
                                    : selectedConversation.fullName}
                            </span>
                        </div>
                        {/* Typing Indicator UI */}
                        {isTyping && (
                            <span className="text-xs italic text-blue-900 animate-pulse">
                                typing...
                            </span>
                        )}
                    </div>
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

export default MessageContainer;

// THIS WAS LIKELY MISSING OR MOVED
const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                <p>Welcome {authUser?.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    );
};