import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const { loading, isAuthenticated, error, message } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md sm:w-[600px] sm:h-[450px]">
          <h1 className="text-[#d6482b] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Login
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] text-stone-500">Email</label>
              <input
                type="email"
                value={email}
                placeholder="example123@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px]  border-b-stone-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-[16px] text-stone-500">Password</label>
                <Link
                  to="/password/forgot"
                  className="text-sm text-[#d6482b] hover:underline"
                >
                  Forgot Your Password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none"
              />
              {/* <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none pr-10 w-full"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-gray-600 cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div> */}

            </div>

            <button
              className="bg-[#d6482b] w-[280px] font-semibold hover:bg-[#b8381e] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white mx-auto my-4"
              type="submit"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Login;
