// src/app/page.tsx
import type { Metadata } from "next";

// Optional: Metadata for SEO / tab title
export const metadata: Metadata = {
  title: "URDS MAIN TEMPLATE",
  description: "This is URDS LANDING PAGE",
};

// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  // Redirect root "/" to URDS folder
  redirect("/signin");
}
