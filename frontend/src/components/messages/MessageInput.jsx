import { useState, useRef } from "react";
import { BsSend, BsImage } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
    const [message, setMessage] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);
    const { loading, sendMessage } = useSendMessage();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Please select an image file");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim() && !selectedImage) return;

        await sendMessage({ text: message, image: selectedImage });
        
        setMessage("");
        setSelectedImage(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Quality of life: hit Escape to cancel the image attachment
    const handleKeyDown = (e) => {
        if (e.key === 'Escape' && selectedImage) {
            setSelectedImage(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className='px-6 py-4 bg-gray-900/60 backdrop-blur-md border-t border-gray-700 flex flex-col gap-3 transition-all'>
            
            {/* Upgraded Image Preview Area */}
            {selectedImage && (
                <div className='relative w-32 h-32 self-start'>
                    <img 
                        src={selectedImage} 
                        alt='Preview' 
                        className='w-full h-full object-cover rounded-xl border-2 border-gray-600 shadow-lg'
                    />
                    <button
                        onClick={() => {
                            setSelectedImage(null);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className='absolute -top-2 -right-2 bg-gray-800 text-gray-300 rounded-full p-1.5 border border-gray-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all shadow-md'
                        type='button'
                        title="Remove image"
                    >
                        <IoClose className='w-4 h-4' />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className='w-full relative flex items-center'>
                <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    className='absolute left-2 p-2.5 rounded-full text-gray-400 hover:text-blue-400 hover:bg-gray-800 transition-all flex items-center justify-center z-10'
                    title="Attach image"
                >
                    <BsImage className="w-5 h-5" />
                </button>

                <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={handleImageChange}
                />

                <input
                    type='text'
                    className='border text-sm rounded-full block w-full py-3.5 pl-14 pr-14 bg-gray-800/80 border-gray-600 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-inner placeholder-gray-400'
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />

                {/* Dynamic Send Button */}
                <button 
                    type='submit' 
                    className={`absolute right-2 p-2.5 rounded-full flex items-center justify-center z-10 transition-all ${
                        (message.trim() || selectedImage) && !loading
                            ? 'text-white bg-blue-600 hover:bg-blue-700 shadow-md' 
                            : 'text-gray-500 hover:bg-gray-800'
                    }`}
                    disabled={loading || (!message.trim() && !selectedImage)}
                >
                    {loading ? <span className='loading loading-spinner loading-sm'></span> : <BsSend className="w-4 h-4 ml-0.5" />}
                </button>
            </form>
        </div>
    );
};

export default MessageInput;