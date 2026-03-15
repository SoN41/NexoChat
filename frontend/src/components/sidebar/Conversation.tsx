import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/socketContext';

const Conversation = ({ conversation, lastIdx, emoji }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?._id === conversation._id;

  const { onlineUsers } = useSocketContext();
  
  // HYBRID CHECK: Check if either the MongoDB _id OR the firebaseUid is in the online array
  const isOnline = onlineUsers.includes(conversation._id) || 
                   (conversation.firebaseUid && onlineUsers.includes(conversation.firebaseUid));

  return (
    <>
        <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ? "bg-sky-500" : ""}
      `}
        onClick={() => setSelectedConversation(conversation)}
      >
          {/* DaisyUI Avatar with dynamic online status */}
          <div className={`avatar ${isOnline ? "online" : ""}`}>
            <div className='w-12 rounded-full'>
              <img src={conversation.profilePic || "https://avatar.iran.liara.run/public"} alt="user avatar" />
            </div>
          </div>
          
          <div className="flex flex-col flex-1">
            <div className='flex gap-3 justify-between'>
              <p className='font-bold text-gray-200'>{conversation.fullName}</p>
              <span className='text-xl'>{emoji}</span>
            </div>
          </div>
        </div>

        {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}
    </>
  )
}

export default Conversation