import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, googleProvider);
            const authInfo = {
                userId: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/expense");
        } catch (err) {
            console.error("Error signing in with Google:", err);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-6">Sign in with Google</h1>
                <button
                    onClick={signInWithGoogle}
                    className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};
