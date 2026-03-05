import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { IoArrowBack, IoCameraOutline } from "react-icons/io5";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const Settings = () => {
    const { authUser } = useAuthContext();
    const { loading, updateProfile } = useUpdateProfile();
    
    const [inputs, setInputs] = useState({
        fullName: authUser.fullName,
        username: authUser.username,
        bio: authUser.bio || "",
        profilePic: authUser.profilePic
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(inputs);
    };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setInputs({ ...inputs, profilePic: reader.result }); // This sets the Base64 string
        };
        reader.readAsDataURL(file);
    }
};

    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border border-slate-500'>
                <div className='flex items-center gap-2 mb-6'>
                    <Link to='/' className='text-gray-300 hover:text-white transition-all'>
                        <IoArrowBack size={24} />
                    </Link>
                    <h1 className='text-3xl font-semibold text-gray-300'>Edit <span className='text-blue-500'>Profile</span></h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Profile Picture Display */}
                    {/* Profile Picture Display */}
<div className='flex flex-col items-center mb-4 group'>
    <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500 relative bg-slate-800'>
        {/* ADD THIS IMG TAG BELOW */}
        <img 
            src={inputs.profilePic || authUser.profilePic} 
            alt='user profile' 
            className="object-cover w-full h-full" 
        />
        
        {/* Label acts as the clickable area for the hidden input */}
        <label className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
            <IoCameraOutline size={30} className="text-white" />
            <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange} 
            />
        </label>
    </div>
    <p className="text-xs text-gray-400 mt-2 italic text-center">
        {inputs.profilePic !== authUser.profilePic ? "Preview (Save to confirm)" : "Current Profile Photo"}
    </p>
</div>

                    <input 
                        type='text' 
                        placeholder="Full Name"
                        className='w-full input input-bordered h-10 bg-slate-700 text-white'
                        value={inputs.fullName}
                        onChange={(e) => setInputs({...inputs, fullName: e.target.value})} 
                    />

                    <input 
                        type='text' 
                        placeholder="Username"
                        className='w-full input input-bordered h-10 bg-slate-700 text-white'
                        value={inputs.username}
                        onChange={(e) => setInputs({...inputs, username: e.target.value})} 
                    />

                    <textarea 
                        className='w-full textarea textarea-bordered bg-slate-700 text-white'
                        placeholder="Bio" 
                        value={inputs.bio}
                        onChange={(e) => setInputs({...inputs, bio: e.target.value})} 
                    />

                    <button 
                        className='btn btn-block btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white' 
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;