import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {
    const { selectedConversation } = useConversation();

    return (
        <div className='flex flex-col flex-1 bg-base-100'>
            {!selectedConversation ? (
                <NoChatSelected />
            ) : (
                <>
                    <div className='bg-base-200 px-6 py-4 border-b border-base-300 flex items-center gap-3 z-10 shadow-sm'>
                        <span className='text-base-content/50 font-medium text-sm'>To:</span>{" "}
                        <span className='text-base-content font-bold tracking-wide'>{selectedConversation.fullName}</span>
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
            <div className='px-4 text-center sm:text-lg md:text-xl text-base-content font-semibold flex flex-col items-center gap-4'>
                <p className="text-3xl font-bold">Welcome to <span className="text-blue-500">NexoChat</span></p>
                <p className="text-base-content/50 font-medium text-base">Select a chat to start messaging</p>
                <TiMessages className='text-6xl md:text-8xl text-blue-500 opacity-80 drop-shadow-lg' />
            </div>
        </div>
    );
};

export default MessageContainer;