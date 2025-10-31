import { useState } from "react";
import graph from "../assets/graphtwo.png";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { UserId } from "../types/types";
const SignIn = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [user, setUser] = useState<UserId>({
    username: "",
    email: "",
    password: "",
  });
  const showPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { placeholder, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [placeholder.toLowerCase()]: value,
    }));
  };
  const signUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("User signed up:", user);
    // Add your sign-up logic here
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white flex p-2 rounded-xl shadow-lg max-w-2xl">
        {/* LEWA STRONA - FORMULARZz */}
        <div className="flex flex-col justify-center items-center w-1/2 p-6">
          <form className="flex flex-col items-center text-center gap-4 w-full max-w-sm">
            <h1 className="text-2xl font-bold text-neutral-600 mb-2">
              Hi! Sign Up!
              <br />
              Welcome to Sigil!
            </h1>

            <input
              type="text"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              className="border-b border-gray-700 placeholder:opacity-50 w-full p-2 outline-none focus:border-blue-500"
            />

            <input
              type="text"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
              className="border-b border-gray-700 placeholder:opacity-50 w-full p-2 outline-none focus:border-blue-500"
            />

            <div className="relative w-full">
              <input
                type={isVisible ? "text" : "password"}
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
                className="border-b border-gray-700 placeholder:opacity-50 w-full p-2 pr-8 outline-none focus:border-blue-500"
              />
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={showPassword}
              >
                {isVisible ? (
                  <IoMdEye className=" size-5" />
                ) : (
                  <IoMdEyeOff className=" size-5" />
                )}
              </button>
            </div>

            <button
              onClick={signUp}
              className="mt-4 bg-amber-500  text-black text-md px-6 py-2 w-full rounded-md hover:bg-amber-600 transition"
            >
              Sign In
            </button>
            <span
              className=" text-[15px]
            text-gray-400"
            >
              Do u have already an account?{" "}
              <a href="/" className="text-blue-500 hover:underline">
                Sign In!
              </a>
            </span>
          </form>
        </div>

        {/* PRAWA STRONA - OBRAZEKz */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={graph}
            alt="Fantasy landscape"
            className="w-full h-auto rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
