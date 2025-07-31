import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgImage from '../assets/bg-image-auth.jpeg'

const Signup = () => {

    // useState for form inputs
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // useState for message
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Form validation
        if (!username || !email || !password) {
            setError('All fields are required!');
            return;
        }

        // when we submit then its set this default things..
        setSuccess('Signup successful!');
        setUsername('');
        setEmail('');
        setPassword('');
    };

    // Navigate
    let navigate = useNavigate();

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage:
                    `url(${BgImage})`,
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />

            <div className="relative z-10 w-full max-w-md px-8 py-10 rounded-3xl shadow-lg bg-white/10 border border-white/20 backdrop-blur-xl text-white">
                <h2 className="text-4xl font-extrabold text-center mb-6 drop-shadow">SignUP</h2>

                {error && <p className="text-red-400 text-sm text-center mb-4 animate-pulse">{error}</p>}
                {success && <p className="text-green-400 text-sm text-center mb-4 animate-bounce">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-cyan-400 transition"
                        />
                    </div>

                    <div className="text-right text-sm">
                        <a href="#" className="text-cyan-300 hover:underline">Forgot password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:from-cyan-600 hover:to-blue-700 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-sm text-center text-gray-200">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-cyan-300 font-medium hover:underline cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Signup;
