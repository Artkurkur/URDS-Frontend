// src/app/page.tsx
// src/app/page.tsx

"use client";


import { useState } from "react";

import Link from "next/link";


export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true); // toggle between sign in and sign up



  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
     

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to URDS</h1>
        <p className="text-lg text-gray-700 mb-6">
          Click the button below to sign in or sign up.
        </p>

       <Link
             href = "/signin"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Sign In / Sign Up
        </Link>

       
        
      </div>
    </div>
  );
}

