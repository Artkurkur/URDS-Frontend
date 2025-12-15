import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in to URDS",
  description: "This is the Signin Page for URDS Management System",
};

export default function SignIn() {
  return <SignInForm />;
}
