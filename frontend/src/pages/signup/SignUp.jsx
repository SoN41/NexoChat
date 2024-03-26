import { Link } from "react-router-dom";
import GenderBox from "./GenderBox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {

    const [inputs , setInputs] = useState({
        fullName : '',
        username : '',
        password  : '',
        confirmPassword : '',
        gender : ''
    });

    const { loading , signup} = useSignup()

    const handleCheckboxChange = (gender) => {
        setInputs({...inputs,gender})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await signup(inputs)
    }

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg backdrop-opacity-0">
                <h1 className=" text-3xl font-semibold text-center text-gray-300">
                    Signup
                    <span className=" text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className=" text-base label-text text-blue-500">Full Name</span>
                        </label>
                        <input type="text" placeholder="John Doe" className="w-full input input-bordered h-10"
                            value={inputs.fullName}
                            onChange={(e) => setInputs({...inputs , fullName : e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="label p-2">
                            <span className=" text-base label-text text-blue-500">Username</span>
                        </label>
                        <input type="text" placeholder="John Doe" className="w-full input input-bordered h-10" 
                            value={inputs.username}
                            onChange={(e) => setInputs({...inputs , username : e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className=" text-base label-text text-blue-500">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" className="w-full input input-bordered h-10" 
                            value={inputs.password}
                            onChange={(e) => setInputs({...inputs , password : e.target.value})}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className=" text-base label-text text-blue-500">Confirm Password</span>
                        </label>
                        <input type="password" placeholder="Confirm Password" className="w-full input input-bordered h-10"
                            value={inputs.confirmPassword}
                            onChange={(e) => setInputs({...inputs , confirmPassword : e.target.value})}
                        />
                    </div>
                    {/* Gender checkbox */}
                    <GenderBox onCheckboxChange= {handleCheckboxChange} selectedGender={inputs.gender} />
                    <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block text-black">
                        Already have you an account
                    </Link>

                    <div>
                        <button className="btn btn-block btn-sm mt-2 border-slate-700"
                            disabled={loading}
                        >
                            {
                                loading ? <span className="loading loading-spinner"></span> : 'Sign up'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp;

// import GenderBox from "./GenderBox";

// const SignUp = () => {
//     return (
//         <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//             <div className="p-6 w-full rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg backdrop-opacity-0">
//                 <h1 className=" text-3xl font-semibold text-center text-gray-300">
//                     Signup
//                     <span className=" text-blue-500"> ChatApp</span>
//                 </h1>
//                 <form>
//                     <div>
//                         <label className="label p-2">
//                             <span className=" text-base label-text text-blue-500">Full Name</span>
//                         </label>
//                         <input type="text" placeholder="John Doe" className="w-full input input-bordered h-10" />
//                     </div>
//                     <div>
//                         <label className="label">
//                             <span className=" text-base label-text text-blue-500">Username</span>
//                         </label>
//                         <input type="text" placeholder="John Doe" className="w-full input input-bordered h-10" />
//                     </div>
//                     <div>
//                         <label className="label">
//                             <span className=" text-base label-text text-blue-500">Password</span>
//                         </label>
//                         <input type="text" placeholder="Enter Password" className="w-full input input-bordered h-10" />
//                     </div>
//                     <div>
//                         <label className="label">
//                             <span className=" text-base label-text text-blue-500">Confirm Password</span>
//                         </label>
//                         <input type="text" placeholder="Confirm Password" className="w-full input input-bordered h-10" />
//                     </div>
//                     {/* Gender checkbox */}
//                     <GenderBox />
//                     <a href="#" className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block text-black">
//                         Already have you an account
//                     </a>

//                     <div>
//                         <button className="btn btn-block btn-sm mt-2 border-slate-700">Signup</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default SignUp;