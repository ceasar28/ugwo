import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { Link } from "react-router-dom";
//import { BsEye, BsEyeSlash } from "react-icons/bs";
import loginImage from "../../assets/amico.png";
//import googleImg from "../assets/devicon_google.jpg";
//import Input from "../Components/Input";
import Button from "../../Components/Button";
//import logoImage from "../assets/material-symbols_robot.png";
//import auxibot from "../assets/material-symbols_robot.jpg";
// import { toast } from "react-toastify";

// import auxiBotProtocol from "../utils/protocol.json";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setUserprofile] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (profile) {
      return navigate("/wallet");
    } else {
      console.log("no record");
      return navigate("/profile");
    }
  };

  const [message, setMessage] = useState<string | boolean>(false);

  return (
    <div className="w-full min-h-full flex justify-center bg-primary-100">
      {/*   <div className="Logo flex items-center mt-5 ml-5 absolute cursor-pointer ">
        <Link to="/">
          {" "}
          <div className="flex items-center cursor-pointer">
            <img
              src={logoImage}
              alt="Logo"
              className="h-8 mr-2 top-[3.5rem] left-[1.6rem]"
            />

            <div className=" text-center text-white text-2xl font-semibold font-['Inter']">
              AuxiBot
              <br />
            </div>
          </div>
        </Link>
        <Link to="/">
          {" "}
          <div className="flex items-center cursor-pointer ms:hidden">
            <img
              src={auxibot}
              alt="Logo"
              className="h-8 mr-2 absolute top-[0rem] left-[0rem]"
            />

            <div className=" text-center text-primary-600 absolute top-[0rem] left-[2.6rem] text-2xl font-semibold font-['Inter']">
              AuxiBot
              <br />
            </div>
          </div>
        </Link>
      </div> */}
      {/*  <div className="w-[45vw] min-h-[100vh] bg-violet-900 hidden ms:flex justify-center items-center">
        <img src={loginImage} alt="Logo" className="w-[70%] mr-12" />
      </div> */}
      <div className="w-[90vw] ms:w-[60vw] min-h-[80vh] ms:absolute  flex flex-col justify-center items-center m-auto">
        <div className="w-[354px] text-center text-black text-[16px] sm:text-[20px] font-semibold font-Sora">
          Make Seamless Payment
        </div>
        <div className="w-[58px] h-[39px] text-center text-black text-[25px] font-semibold font-['Inter']"></div>

        <form
          className="bg-primary-100 rounded-lg shadow-8xl p-6 max-w-md mx-auto transform transition-all duration-300 hover:shadow-4xl"
          onSubmit={handleSubmit}
        >
          {/* Email Input */}
          {/* <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              First Name
            </p>
            <Input
              type={"text"}
              placeholder="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div> */}
          {/* <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">
              Last Name
            </p>
            <Input
              type={"text"}
              placeholder="Last NAME"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div>
            <p className="text-[16px] font-Sora font-medium mb-[14px]">Email</p>
            <Input
              type={"text"}
              placeholder="Enter your Email"
              value={email}
              onChange={handleEmailChange}
            />
          </div> */}
          <img src={loginImage} alt="Logo" className="flex justify-center items-center w-[70%] ml-12" />

          <Button
            onClick={handleSubmit}
            className="w-full h-12 mt-4 bg-black-600 text-white rounded-md hover:bg-black-400"
          >
            Get Started
          </Button>

          {message && (
            <p className="mt-[0.5rem] text-center text-[19px] font-semibold">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
