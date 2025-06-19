import { clearAllErrors, forgotPassword, clearForgotPasswordMessage } from '@/store/slices/forgotResetPasswordSlice'; 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const { loading, error, message } = useSelector((state) => state.forgotPassword);
  const dispatch = useDispatch();

  const handleForgotPassword = (e) => {
    e.preventDefault(); 
    if (!email) return toast.error("Please enter your email.");
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllErrors()); 
    }

    if (message) {
      toast.success(message);
      setEmail(""); 
      dispatch(clearForgotPasswordMessage());
    }
  }, [dispatch, error, message]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
          <h1 className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Forgot Password
          </h1>

          <form onSubmit={handleForgotPassword} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Email</label>
              <input
                type="email"
                value={email}
                placeholder="example123@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Link
                  to="/login"
                  className="text-sm text-[#d6482b] hover:underline"
                >
                  Remember Your Password?
                </Link>
              </div>
            </div>

            <button
              className="bg-[#d6482b] w-[280px] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4"
              type="submit"
            >
              {loading ? "Requesting..." : "Request For Reset Password"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;