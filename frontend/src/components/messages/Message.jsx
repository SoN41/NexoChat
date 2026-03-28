import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime';
import useConversation from '../../zustand/useConversation';

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formatedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? 'bg-blue-600' : 'bg-base-300';
  const textColor = fromMe ? 'text-white' : 'text-base-content';
  const shakeClass = message.shouldShake ? "shake" : "";
  const hasImage = !!message.image;
  const hasText = !!message.message;

  return (
    <div className={`chat ${chatClassName} mb-4`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full border border-base-300 shadow-sm">
                <img src={profilePic} alt="profile" />
            </div>
        </div>
        
        <div className={`chat-bubble ${textColor} ${bubbleBgColor} ${shakeClass} shadow-md flex flex-col ${hasImage && !hasText ? 'p-1.5' : 'py-2 px-3'}`}>
            {hasImage && (
                <img
                    src={message.image}
                    alt="attachment"
                    className={`max-w-[240px] sm:max-w-[280px] rounded-lg object-cover ${hasText ? 'mb-2' : ''}`}
                />
            )}
            {hasText && (
                <p className={`text-sm md:text-base leading-relaxed ${hasImage ? 'px-1' : ''}`}>
                    {message.message}
                </p>
            )}
        </div>
        
        <div className="chat-footer opacity-60 text-xs flex gap-1 items-center mt-1">
            {formatedTime}
        </div>
    </div>
  )
}

export default Message;