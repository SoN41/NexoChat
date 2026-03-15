import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { IoArrowBack, IoCameraOutline } from "react-icons/io5";
import useUpdateProfile from "../../hooks/useUpdateProfile";

const Settings = () => {
    const { authUser } = useAuthContext();
    const { loading, updateProfile } = useUpdateProfile();
    
    const [inputs, setInputs] = useState({
        // Check for MongoDB fullName OR Firebase displayName
        fullName: authUser.fullName || authUser.displayName || "",
        
        // Check for MongoDB username OR create one from Firebase email
        username: authUser.username || (authUser.email ? authUser.email.split('@')[0] : ""),
        
        bio: authUser.bio || "",
        
        // Check for MongoDB profilePic OR Firebase photoURL
        profilePic: authUser.profilePic || authUser.photoURL || ""
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
                setInputs({ ...inputs, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center w-full max-w-md mx-auto'>
            <div className='w-full p-8 rounded-2xl shadow-2xl bg-gray-900 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-700'>
                <div className='flex items-center gap-3 mb-8'>
                    <Link to='/' className='p-2 rounded-full bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-all'>
                        <IoArrowBack size={20} />
                    </Link>
                    <h1 className='text-2xl font-bold text-white'>Edit <span className='text-blue-500'>Profile</span></h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Profile Picture Display */}
                    <div className='flex flex-col items-center mb-2 group'>
                        <div className='w-28 h-28 rounded-full overflow-hidden border-4 border-gray-700 hover:border-blue-500 transition-colors relative bg-gray-800 shadow-lg'>
                            <img 
                                src={inputs.profilePic || authUser.profilePic || "https://avatar.iran.liara.run/public"} 
                                alt='user profile' 
                                className="object-cover w-full h-full" 
                            />
                            <label className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm">
                                <IoCameraOutline size={32} className="text-white drop-shadow-md" />
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleImageChange} 
                                />
                            </label>
                        </div>
                        <p className="text-xs text-gray-400 mt-3 font-medium">
                            {inputs.profilePic !== authUser.profilePic ? "Preview (Save to confirm)" : "Tap to change photo"}
                        </p>
                    </div>

                    <div>
                        <label className="label p-0 mb-1"><span className="text-sm font-medium text-gray-300">Full Name</span></label>
                        <input 
                            type='text' placeholder="Full Name"
                            className='w-full input input-bordered h-11 bg-gray-800 border-gray-600 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
                            value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label className="label p-0 mb-1"><span className="text-sm font-medium text-gray-300">Username</span></label>
                        <input 
                            type='text' placeholder="Username"
                            className='w-full input input-bordered h-11 bg-gray-800 border-gray-600 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
                            value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label className="label p-0 mb-1"><span className="text-sm font-medium text-gray-300">Bio</span></label>
                        <textarea 
                            className='w-full textarea textarea-bordered bg-gray-800 border-gray-600 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none h-24'
                            placeholder="Tell us about yourself..." 
                            value={inputs.bio} onChange={(e) => setInputs({...inputs, bio: e.target.value})} 
                        />
                    </div>

                    <button 
                        className='btn btn-block h-11 bg-blue-600 hover:bg-blue-700 border-none text-white mt-6 shadow-lg shadow-blue-500/30' 
                        disabled={loading}
                    >
                        {loading ? <span className="loading loading-spinner text-white"></span> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;