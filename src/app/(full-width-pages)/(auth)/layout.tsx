"use client";

import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";
import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative p-6 bg-white dark:bg-gray-900 sm:p-0">
      <ThemeProvider>
        <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col sm:p-0 dark:bg-gray-900">
          
          {/* Left side: Auth form or children */}
          <div className="flex-1 flex items-center justify-center w-full h-full">
            {children}
          </div>

          {/* Right side: Background image */}
          <div className="lg:w-1/2 w-full h-full relative lg:grid items-center hidden">
            {/* Background image using Next.js Image */}
            <Image
              src="/images/siginbg/auth-bg.jpg" // path inside public/
              alt="Auth Background"
              fill
              className="object-cover"
              priority
            />

            {/* Optional overlay content */}
            <div className="relative z-10 flex items-center justify-center">
              <GridShape />
            </div>
          </div>

          {/* Theme toggler button */}
          <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
            <ThemeTogglerTwo />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
