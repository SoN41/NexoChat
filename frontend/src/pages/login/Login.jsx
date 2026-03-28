import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase.config";
import { useAuthContext } from "../../context/AuthContext";
import useLogin from "../../hooks/useLogin";
import toast from "react-hot-toast";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const { loading: loginLoading, login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await login(username, password);
        setLoading(false);
    }

    const handleGoogleSignIn = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            setAuthUser(user);
            toast.success(`Welcome ${user.displayName}!`);
            navigate("/");
        } catch (error) {
            toast.error("Google Sign-In failed.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
            <div className="p-8 w-full rounded-2xl shadow-2xl bg-base-100 border border-base-300">
                <h2 className="text-3xl font-bold text-center text-base-content mb-6">
                    Login to <span className="text-blue-500">NexoChat</span>
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-sm font-medium text-base-content/70">Username</span>
                        </label>
                        <input type="text" placeholder="Enter Username" 
                            className="w-full input input-bordered h-11 bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-sm font-medium text-base-content/70">Password</span>
                        </label>
                        <input type="password" placeholder="Enter Password" 
                            className="w-full input input-bordered h-11 bg-base-200 text-base-content focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="divider text-base-content/50 text-sm py-2">OR</div>

                    <button 
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="btn btn-block h-11 bg-base-200 hover:bg-base-300 text-base-content border-base-300 flex items-center gap-3 font-medium transition-all"
                        disabled={loading}
                    >
                        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
                        Sign in with Google
                    </button>

                    <div className="text-center mt-4">
                        <Link to="/signup" className="text-sm text-base-content/50 hover:text-blue-500 hover:underline transition-colors">
                            Don't have an account? Sign up
                        </Link>
                    </div>

                    <button className="btn btn-block h-11 bg-blue-600 hover:bg-blue-700 border-none text-white mt-2" disabled={loading || loginLoading}>
                        {loading || loginLoading ? <span className="loading loading-spinner text-white"></span> : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;