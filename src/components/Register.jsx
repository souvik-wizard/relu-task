import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../store/slices/authSlice";
import { Loader2 } from "lucide-react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [localError, setLocalError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
    } else {
      setPasswordMatchError("");
    }
  }, [password, confirmPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();

    setLocalError("");
    setPasswordMatchError("");

    if (password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match");
      return;
    }

    dispatch(setLoading(true));
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName });

      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName,
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
      <div className="w-full max-w-md bg-white/80 rounded-[10px] shadow-2xl border border-white/30 overflow-hidden transform transition-all duration-300 ">
        <div className="p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#FF5E8A] font-semibold hover:text-[#FF5E8A]/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {localError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg animate-pulse">
              {localError}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label
                htmlFor="displayName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="displayName"
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-[#88C2BB] focus:outline-none focus:border-[#88C2BB] focus:ring-0 transition duration-300"
                placeholder="Enter your display name"
                disabled={isLoading}
              />
            </div>

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
                placeholder="Create a password"
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

            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-[#88C2BB] focus:outline-none focus:border-[#88C2BB] focus:ring-0 transition duration-300 pr-12"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() =>
                  setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                }
                className="absolute right-3 top-10 text-gray-500 hover:text-[#88C2BB] transition"
                disabled={isLoading}
              >
                {isConfirmPasswordVisible ? "Hide" : "Show"}
              </button>
            </div>

            {passwordMatchError && (
              <div className="text-red-500 text-sm mt-1">
                {passwordMatchError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#88C2BB] text-white py-3 rounded-lg hover:bg-[#88C2BB]/90 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#88C2BB] focus:ring-offset-2 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
