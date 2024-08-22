import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

type ContinueButtonProps = {
  isEnabled: boolean;
};

const ContinueButton = ({ isEnabled }: ContinueButtonProps) => {
  const [targetUrl, setTargetUrl] = useState("/login-password");
  const { getValues } = useFormContext();

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

  const handleClick = () => {
    if (typeof window !== "undefined") {
      const email = getValues("email");
      sessionStorage.setItem("email", email);
    }
  };

  return isEnabled ? (
    <Link href={targetUrl}>
      <div
        className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-custom-lime text-black px-4 py-4 rounded-[10px] font-bold text-center pt-4 cursor-pointer mb-4"
        onClick={handleClick}>
        Continuar
      </div>
    </Link>
  ) : (
    <div className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-custom-lime text-black px-4 py-4 rounded-[10px] font-bold text-center pt-4 cursor-not-allowed pointer-events-none mb-4">
      Continuar
    </div>
  );
};

export default ContinueButton;
