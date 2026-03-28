import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { IoArrowBack, IoCameraOutline } from "react-icons/io5";
import { BsSun, BsMoon } from "react-icons/bs";
import useUpdateProfile from "../../hooks/useUpdateProfile";
import useTheme from "../../hooks/useTheme";

const Settings = () => {
    const { authUser } = useAuthContext();
    const { loading, updateProfile } = useUpdateProfile();
    const { theme, toggleTheme } = useTheme();
    
    const [inputs, setInputs] = useState({
        fullName: authUser.fullName || authUser.displayName || "",
        username: authUser.username || (authUser.email ? authUser.email.split('@')[0] : ""),
        bio: authUser.bio || "",
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
            reader.onloadend = () => setInputs({ ...inputs, profilePic: reader.result });
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className='w-screen h-screen flex bg-base-100 overflow-hidden'>

            {/* Left Panel - Profile Picture & Info */}
            <div className='w-80 bg-base-200 border-r border-base-300 flex flex-col items-center justify-center p-8 gap-4'>
                <div className='relative group w-36 h-36'>
                    <div className='w-full h-full rounded-full overflow-hidden border-4 border-base-300 hover:border-blue-500 transition-colors bg-base-300 shadow-xl'>
                        <img 
                            src={inputs.profilePic || "https://avatar.iran.liara.run/public"} 
                            alt='user profile' 
                            className="object-cover w-full h-full" 
                        />
                    </div>
                    <label className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm">
                        <IoCameraOutline size={36} className="text-white drop-shadow-md" />
                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>

                <div className='text-center'>
                    <p className='text-lg font-bold text-base-content'>{inputs.fullName || "Your Name"}</p>
                    <p className='text-sm text-base-content/50'>@{inputs.username || "username"}</p>
                    {inputs.bio && (
                        <p className='text-sm text-base-content/70 mt-2 italic'>"{inputs.bio}"</p>
                    )}
                </div>

                <p className="text-xs text-base-content/40 mt-2">
                    {inputs.profilePic !== (authUser.profilePic || authUser.photoURL) 
                        ? "Preview (Save to confirm)" 
                        : "Hover photo to change"}
                </p>
            </div>

            {/* Right Panel - Edit Form */}
            <div className='flex-1 flex flex-col overflow-y-auto'>

                {/* Top bar */}
                <div className='flex items-center justify-between px-8 py-5 border-b border-base-300 bg-base-100'>
                    <div className='flex items-center gap-3'>
                        <Link to='/' className='p-2 rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-all'>
                            <IoArrowBack size={20} />
                        </Link>
                        <h1 className='text-2xl font-bold text-base-content'>
                            Edit <span className='text-blue-500'>Profile</span>
                        </h1>
                    </div>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className='p-2 rounded-full bg-base-200 text-base-content hover:bg-base-300 transition-all'
                    >
                        {theme === "dark"
                            ? <BsSun className="w-5 h-5 text-yellow-400" />
                            : <BsMoon className="w-5 h-5" />
                        }
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='flex-1 p-8 max-w-xl space-y-6'>
                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-sm font-medium text-base-content/70">Full Name</span>
                        </label>
                        <input 
                            type='text'
                            placeholder="Full Name"
                            className='w-full input input-bordered h-11 bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs, fullName: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-sm font-medium text-base-content/70">Username</span>
                        </label>
                        <input 
                            type='text'
                            placeholder="Username"
                            className='w-full input input-bordered h-11 bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
                            value={inputs.username}
                            onChange={(e) => setInputs({...inputs, username: e.target.value})} 
                        />
                    </div>

                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-sm font-medium text-base-content/70">Bio</span>
                        </label>
                        <textarea 
                            className='w-full textarea textarea-bordered bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none h-28'
                            placeholder="Tell us about yourself..." 
                            value={inputs.bio}
                            onChange={(e) => setInputs({...inputs, bio: e.target.value})} 
                        />
                    </div>

                    <button 
                        className='btn h-11 px-10 bg-blue-600 hover:bg-blue-700 border-none text-white shadow-lg shadow-blue-500/30' 
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