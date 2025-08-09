import {
  resetPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      return toast.error("Please fill out both fields.");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    dispatch(resetPassword(token, password, confirmPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (message !== null) {
      toast.success(message);
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigateTo("/login");
      }, 2000); // Redirect to login after 2 seconds
    }
  }, [dispatch, error, message]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
          <h1 className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Reset Password
          </h1>

          <form
            onSubmit={handleResetPassword}
            className="flex flex-col gap-5 w-full"
          >
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Password</label>
              {/* <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              /> */}
              <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none pr-10 w-full"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-[16px] py-2 bg-transparent border-b-[1px]  border-b-stone-500 focus:outline-none"
              />

              {/* <div className="relative w-full">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none pr-10 w-full"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-3 text-gray-600 cursor-pointer"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div> */}

            </div>

            <button
              className="bg-[#d6482b] w-[280px] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4"
              type="submit"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ResetPassword;
