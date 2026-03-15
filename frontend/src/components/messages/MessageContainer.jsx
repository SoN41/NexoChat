import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
    const { selectedConversation } = useConversation();

    return (
        <div className='flex flex-col flex-1 bg-gray-900/20'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    {/* Premium Header */}
                    <div className='bg-gray-800/60 px-6 py-4 border-b border-gray-700 backdrop-blur-md flex items-center gap-3 z-10 shadow-sm'>
                        <span className='text-gray-400 font-medium text-sm'>To:</span>{" "}
                        <span className='text-white font-bold tracking-wide'>{selectedConversation.fullName}</span>
                    </div>
                    
                    <Messages />
                    <MessageInput />
                </>
            )}
        </div>
    );
};

const NoChatSelected = () => {
    return (
        <div className='flex items-center justify-center w-full h-full'>
            <div className='px-4 text-center sm:text-lg md:text-xl text-gray-300 font-semibold flex flex-col items-center gap-4'>
                <p className="text-3xl font-bold">Welcome to <span className="text-blue-500">NexoChat</span></p>
                <p className="text-gray-400 font-medium text-base">Select a chat to start messaging</p>
                <TiMessages className='text-6xl md:text-8xl text-blue-500 opacity-80 drop-shadow-lg' />
            </div>
        </div>
    );
};

export default MessageContainer;