import { useState } from "react";
import graph from "../assets/graph.png";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { UserId } from "../types/types";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  //tymczasowy kod do nawigacji po zalogowaniu
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [user, setUser] = useState<UserId>({
    username: "szymus",
    email: "",
    password: "123",
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
  const signIn = () => {
    //tymczasowy kod do nawigacji po zalogowaniu
    if (user.username === "szymus" && user.password === "123") {
      navigate("/lobby", { replace: true });
    } else {
      console.log("Invalid credentials");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="bg-white flex p-2 rounded-xl shadow-lg max-w-2xl">
        {/* LEWA STRONA - FORMULARZz */}
        <div className="flex flex-col justify-center items-center w-1/2 p-6">
          <form
            className="flex flex-col items-center text-center gap-4 w-full max-w-sm"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-2xl font-bold text-neutral-600 mb-2">
              Hi! Sign In!
              <br />
              Welcome back to Sigil!
            </h1>

            <div className="w-full h-[81.5px]">
              <input
                type="text"
                placeholder="Username"
                value={user.username}
                onChange={handleChange}
                className="border-b border-gray-700 placeholder:opacity-50 w-full  focus:border-b-2 focus:border-amber-600 p-2 outline-none "
              />

              <div className="relative w-full ">
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
                  value={user.password}
                  onChange={handleChange}
                  className="border-b border-gray-700 placeholder:opacity-50 w-full duration-75 focus:border-amber-600 focus:border-b-2 p-2 pr-8 outline-none "
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
            </div>
            <div className="mt-3">
              <button
                type="button"
                onClick={signIn}
                className="mt-4 bg-amber-500  text-black text-md px-6 py-2 w-full rounded-md hover:bg-amber-600 transition"
              >
                Sign In
              </button>
              <span
                className=" 
              text-gray-400"
              >
                Don't have an account?{" "}
                <a href="/sign-up" className="text-blue-500 hover:underline">
                  Sign Up!
                </a>
              </span>
            </div>
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
