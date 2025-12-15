"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Label from "@/components/form/Label";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fname: "",
    mname: "",
    lname: "",
    collegeID: "",
    username: "",
    password: "",
  });

  // College dropdown options
  const colleges = [
    { collegeID: 1, college_name: "College of Law" },
    { collegeID: 2, college_name: "College of Agriculture, Fisheries and Natural Resources" },
    { collegeID: 3, college_name: "College of Business and Administration" },
    { collegeID: 4, college_name: "College of Arts and Communication" },
    { collegeID: 5, college_name: "College of Engineering" },
    { collegeID: 6, college_name: "College of Education" },
    { collegeID: 7, college_name: "College of Nursing and Allied Health Sciences" },
    { collegeID: 8, college_name: "College of Science" },
    { collegeID: 9, college_name: "College of Veterinary Medicine" },
    { collegeID: 10, college_name: "College of Criminal Justice" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (e) {
      e.preventDefault();
    }
    
    console.log("Form submitted with data:", formData);
    console.log("Checkbox checked:", isChecked);
    
    setError("");
    setSuccess(false);

    // Validation with trimmed values
    if (!formData.fname.trim() || !formData.mname.trim() || !formData.lname.trim() || !formData.collegeID || !formData.username.trim() || !formData.password.trim()) {
      setError("All required fields must be filled");
      console.log("Validation failed: missing fields");
      return;
    }

    if (!isChecked) {
      setError("You must agree to the Terms and Conditions");
      console.log("Validation failed: checkbox not checked");
      return;
    }

    setLoading(true);
    console.log("Sending registration request...");

    try {
      const response = await fetch("http://192.168.254.142:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname: formData.fname.trim(),
          mname: formData.mname.trim(),
          lname: formData.lname.trim(),
          collegeID: parseInt(formData.collegeID), // Convert to number for database
          username: formData.username.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Registration successful
      setSuccess(true);
      
      // Optionally store token if API returns it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect to sign in page after 2 seconds
      setTimeout(() => {
        window.location.href = "/signin";
      }, 2000);

    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <div className="space-y-5">
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg">
                  {error}
                </div>
              )}

              {success && (
                <div className="p-3 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 rounded-lg">
                  Registration successful! Redirecting to sign in...
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* First Name */}
                <div className="sm:col-span-1">
                  <Label>
                    First Name<span className="text-error-500">*</span>
                  </Label>
                  <input
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    type="text"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                {/* Middle Name */}
                <div className="sm:col-span-1">
                  <Label>
                    Middle Name<span className="text-error-500">*</span>
                  </Label>
                  <input
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    type="text"
                    name="mname"
                    value={formData.mname}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your middle name"
                    required
                  />
                </div>
                {/* Last Name */}
                <div className="sm:col-span-2">
                  <Label>
                    Last Name<span className="text-error-500">*</span>
                  </Label>
                  <input
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    type="text"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                {/* College Dropdown */}
                <div className="sm:col-span-2">
                  <Label>
                    College<span className="text-error-500">*</span>
                  </Label>
                  <select
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    name="collegeID"
                    value={formData.collegeID}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>Select your college</option>
                    {colleges.map((college) => (
                      <option key={college.collegeID} value={college.collegeID}>
                        {college.college_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Username */}
              <div>
                <Label>
                  Username<span className="text-error-500">*</span>
                </Label>
                <input
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your username"
                  required
                />
              </div>
              {/* Password */}
              <div>
                <Label>
                  Password<span className="text-error-500">*</span>
                </Label>
                <div className="relative">
                  <input
                    className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    required
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                  >
                    {showPassword ? (
                      <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                    ) : (
                      <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                    )}
                  </span>
                </div>
              </div>
              {/* Checkbox */}
              <div className="flex items-center gap-3">
                <Checkbox
                  className="w-5 h-5"
                  checked={isChecked}
                  onChange={setIsChecked}
                />
                <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  By creating an account means you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions,
                  </span>{" "}
                  and our{" "}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </p>
              </div>
              {/* Button */}
              <div>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}