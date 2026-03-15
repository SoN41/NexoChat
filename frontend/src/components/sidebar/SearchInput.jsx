import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetConversatoins from '../../hooks/useGetConversations'
import toast from "react-hot-toast";

const SearchInput = () => {

  const [search , setSearch] = useState("");
  const {setSelectedConversation} = useConversation();
  const {conversations} = useGetConversatoins();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) return
    if(search.length < 3) {
      return toast.error("search term must be atleast 3 characters long");
    }
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    if(conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    }else {
      toast.error("No such user found")
    }
  }

  return (
    <form className='flex items-center gap-2'>
            <input 
                type='text' 
                placeholder='Search...' 
                className='input input-bordered rounded-full h-11 bg-gray-800 border-gray-600 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full transition-all shadow-inner' 
            />
            <button type='submit' className='btn btn-circle bg-blue-600 hover:bg-blue-700 border-none text-white shadow-lg shadow-blue-500/30 transition-all'>
                <IoSearchSharp className='w-5 h-5 outline-none' />
            </button>
        </form>
  ) 
}

export default SearchInput;