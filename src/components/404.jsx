import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ErrorPage = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user exists in Redux state or localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!user && !storedUser) {
      navigate("/login"); // Redirect to login if no user found
    }
  }, [user, navigate]);

  return (
    <div className="h-[100vh] bg-white items-center flex justify-center px-5 lg:px-0">
      <div className="w-[415px] text-center flex-col items-center justify-center mx-auto gap-[100px]">
        <div className="mb-8 md:mb-[56px]">
          <div className="max-w-[312px] w-full h-[160px] relative flex justify-center items-center mx-auto">
            <img src="/assets/404.webp" alt="404" />
          </div>
        </div>
        <div>
          <h3 className="text-4xl md:text-[56px] leading-[64px] text-[#1A1C16]">
            Page Not Found
          </h3>
        </div>
        <div className="flex flex-col gap-6 mt-3">
          <div className="text-center">
            <p className="text-base leading-6 tracking-wider font-sans">
              Looks like you are lost. This page does not exist.
            </p>
          </div>
          <div>
            <button
              onClick={() => {
                // Check user in Redux or localStorage and navigate accordingly
                if (!user && !JSON.parse(localStorage.getItem("user"))) {
                  navigate("/login");
                } else {
                  navigate("/dashboard");
                }
              }}
              className="bg-[#8AC732] text-white font-sans max-w-[146px] w-full h-[48px] rounded-[100px] font-medium text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
