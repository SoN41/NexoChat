import { Link } from "react-router-dom";
import GenderBox from "./GenderBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: '', username: '', password: '', confirmPassword: '', gender: ''
    });

    const { loading, signup } = useSignup();

    const handleCheckboxChange = (gender) => setInputs({ ...inputs, gender });
    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);
    }

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div className="w-full p-8 rounded-2xl shadow-2xl bg-base-100 border border-base-300">
                <h1 className="text-3xl font-bold text-center text-base-content mb-6">
                    Join <span className="text-blue-500">NexoChat</span>
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-sm font-medium text-base-content/70">Full Name</span>
                        </label>
                        <input type="text" placeholder="John Doe" 
                            className="w-full input input-bordered h-11 bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={inputs.fullName} onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-sm font-medium text-base-content/70">Username</span>
                        </label>
                        <input type="text" placeholder="johndoe" 
                            className="w-full input input-bordered h-11 bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label p-0 mb-1">
                                <span className="text-sm font-medium text-base-content/70">Password</span>
                            </label>
                            <input type="password" placeholder="••••••••" 
                                className="w-full input input-bordered h-11 bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label p-0 mb-1">
                                <span className="text-sm font-medium text-base-content/70">Confirm</span>
                            </label>
                            <input type="password" placeholder="••••••••" 
                                className="w-full input input-bordered h-11 bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                            />
                        </div>
                    </div>
                    
                    <GenderBox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />
                    
                    <div className="text-center mt-2">
                        <Link to="/login" className="text-sm text-base-content/50 hover:text-blue-500 hover:underline transition-colors">
                            Already have an account? Login
                        </Link>
                    </div>

                    <button className="btn btn-block h-11 bg-blue-600 hover:bg-blue-700 border-none text-white mt-4" disabled={loading}>
                        {loading ? <span className="loading loading-spinner text-white"></span> : 'Sign up'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default SignUp;