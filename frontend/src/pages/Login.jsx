import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgImage from '../assets/bg-image-auth.jpeg'
import axios from 'axios';
import { Link } from 'react-router-dom';

// import the React Icons................................
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const Login = ({ setIsLoggedIn }) => {
    // state for input 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // state for error and success
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Basic validation
        if (!email || !password) {
            setError('Both email and password are required!');
            return;
        }

        // Connect frontend with Django(Backend)......
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/accounts/login/', {
                email,
                password
            });

            if (response.status === 200) {
                const { access, refresh } = response.data;

                // save token to localStorage
                localStorage.setItem('access_token', access);
                localStorage.setItem('refresh_token', refresh);

                // Update login state
                setIsLoggedIn(true);

                setSuccess(response.data.message || 'Login Successfully!');
                setEmail('');
                setPassword('');

                // Navigate only on successful login
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error || 'Invald Credentials');
            } else {
                setError('Network Error')
            }
            console.log("Error", error);
        }

    };

    // Navigate 
    let navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage: `url(${BgImage})`,
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-md px-8 py-10 rounded-3xl shadow-lg bg-white/10 border border-white/20 backdrop-blur-xl text-white">
                <h2 className="text-4xl font-extrabold text-center mb-6 drop-shadow">Login</h2>

                {error && <p className="text-red-400 text-sm text-center mb-4 animate-pulse">{error}</p>}
                {success && <p className="text-green-400 text-sm text-center mb-4 animate-bounce">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg">
                            <MdEmail />
                        </div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        />
                    </div>
                    <div className="relative">
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-lg">
                            <RiLockPasswordFill />
                        </div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        />
                    </div>

                    <div className="text-right text-sm">
                        <Link to="/forgot-password" className="text-cyan-300 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition duration-300"
                    >
                        Log In
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-200">
                    Don’t have an account?{' '}
                    <span
                        className="text-cyan-300 font-medium hover:underline cursor-pointer"
                        onClick={() => navigate("/signup")}
                    >
                        Signup
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
