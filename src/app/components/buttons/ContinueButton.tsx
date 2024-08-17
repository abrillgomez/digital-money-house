import React, { useEffect, useState } from "react";
import Link from "next/link";

type ContinueButtonProps = {
  isEnabled: boolean;
};

const ContinueButton = ({ isEnabled }: ContinueButtonProps) => {
  const [targetUrl, setTargetUrl] = useState("/login-password");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname === "/login") {
        setTargetUrl("/login-password");
      } else if (pathname === "/login-password") {
        setTargetUrl("/");
      }
    }
  }, []);

  return isEnabled ? (
    <Link href={targetUrl}>
      <div className="w-[360px] h-[64px] bg-custom-lime text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-pointer mb-2">
        Continuar
      </div>
    </Link>
  ) : (
    <div className="w-[360px] h-[64px] bg-custom-lime text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-not-allowed pointer-events-none mb-2">
      Continuar
    </div>
  );
};

export default ContinueButton;
