import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/socketContext';

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id) || 
                   (conversation.firebaseUid && onlineUsers.includes(conversation.firebaseUid));

  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-base-300 rounded p-2 py-1 cursor-pointer transition-all
            ${isSelected ? "bg-base-300" : ""}
        `}
            onClick={() => setSelectedConversation(conversation)}
        >
            <div className={`avatar ${isOnline ? "online" : ""}`}>
                <div className='w-12 rounded-full border border-base-300'>
                    <img src={conversation.profilePic || "https://avatar.iran.liara.run/public"} alt="user avatar" />
                </div>
            </div>
            
            <div className="flex flex-col flex-1">
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-base-content'>{conversation.fullName}</p>
                    {/* <span className='text-xl'>{emoji}</span> */}
                </div>
            </div>
        </div>

        {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}
    </>
  )
}

export default Conversation