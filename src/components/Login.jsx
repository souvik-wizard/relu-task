import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../store/slices/authSlice";
import { FcGoogle } from "react-icons/fc";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.loading);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    dispatch(setLoading(true));
    setLocalError("");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
      };

      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(setUser(userData));
      navigate("/dashboard");
    } catch (error) {
      setLocalError(error.message);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    setLocalError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName || "",
      };

      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(setUser(userData));
      navigate("/dashboard");
    } catch (error) {
      setLocalError(error.message);
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#88C2BB] via-[#88C2BB]/80 to-[#88C2BB]/60 p-4">
      <div className="w-full max-w-md bg-white/80  rounded-[10px] shadow-2xl border border-white/30 overflow-hidden ">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#FF5E8A] font-semibold hover:text-[#FF5E8A]/80 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          {localError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg animate-pulse">
              {localError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-[#88C2BB] focus:outline-none focus:border-[#88C2BB] focus:ring-0 transition duration-300"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-[#88C2BB] focus:outline-none focus:border-[#88C2BB] focus:ring-0 transition duration-300 pr-12"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute right-3 top-10 text-gray-500 hover:text-[#88C2BB] transition"
                disabled={isLoading}
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#88C2BB] text-white py-3 rounded-lg hover:bg-[#88C2BB]/90 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#88C2BB] focus:ring-offset-2 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="flex items-center justify-center space-x-4 my-4">
            <div className="h-px bg-gray-300 w-full"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#88C2BB] focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing In...
              </>
            ) : (
              <>
                <FcGoogle className="w-5 h-5" />
                <span>Sign in with Google</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
