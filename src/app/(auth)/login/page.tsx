'use client';

import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      {/* Top navigation */}
      <div className="flex items-center gap-2 font-medium p-2 md:p-10">
        <a href="#" className="flex items-center gap-2 font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Telehealth
        </a>
      </div>

      {/* Login content area */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-2 md:py-16">
        {/* Single main container without extra shadow */}
        <div className="w-full max-w-sm md:max-w-3xl rounded-xl md:p-0">
          <LoginForm imageSrc="/images/phisio-login.jpg" />
        </div>
      </div>

    </div>
  );
}
