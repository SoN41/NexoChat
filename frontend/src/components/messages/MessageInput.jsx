import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const { loading, sendMessage } = useSendMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;
        await sendMessage(message);
        setMessage("");
    };

    return (
        <form className='px-6 py-4 bg-gray-900/40 border-t border-gray-700' onSubmit={handleSubmit}>
            <div className='w-full relative flex items-center'>
                <input
                    type='text'
                    className='border text-sm rounded-full block w-full p-3.5 bg-gray-800 border-gray-600 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all pr-12 shadow-inner'
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button 
                    type='submit' 
                    className='absolute right-2 p-2 rounded-full text-gray-400 hover:text-blue-500 hover:bg-gray-700 transition-all flex items-center justify-center'
                    disabled={loading}
                >
                    {loading ? <span className='loading loading-spinner loading-sm'></span> : <BsSend className="w-5 h-5 ml-0.5" />}
                </button>
            </div>
        </form>
    );
};

export default MessageInput;