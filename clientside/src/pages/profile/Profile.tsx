import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

import Button from "../../Components/Button";

interface FormData {
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  walletAddress: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    displayName: "",
    firstName: "",
    lastName: "",
    email: "",
    walletAddress: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    try {
      const response = await axios.post("http://ugwo.onrender.com/user", formData);
      if (response.data) {
        console.log("User created successfully:", response.data);
        navigate("/wallet");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError; // Cast error to AxiosError
        console.error("Error creating user:", axiosError);
        console.error("Server responded with:", axiosError.response?.data);
      } else {
        console.error("Error setting up request:", error);
      }
    }
  };

  return (
    <div className="w-full min-h-full flex justify-center bg-primary-100">
      <div className="w-[90vw] ms:w-[60vw] min-h-[80vh] ms:absolute flex flex-col justify-center items-center m-auto">
        <div className="w-[354px] text-center text-black text-[16px] sm:text-[20px] font-semibold font-Sora">
          Create Profile
        </div>
        <div className="w-[58px] h-[39px] text-center text-black text-[25px] font-semibold font-['Inter']"></div>

        <form
          className="bg-primary-100 rounded-lg shadow-8xl p-6 max-w-md mx-auto transform transition-all duration-300 hover:shadow-4xl"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="displayName"
            placeholder="Display Name"
            value={formData.displayName}
            onChange={handleChange}
            className="w-full h-12 mt-4 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full h-12 mt-4 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full h-12 mt-4 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 mt-4 p-2 border border-gray-300 rounded-md"
            required
          />
          <Button
            className="w-full h-12 mt-4 bg-black-600 text-white rounded-md hover:bg-black-400"
            type="submit"
          >
            Create Profile
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
