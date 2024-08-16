import React from "react";
import Link from "next/link";

type ContinueButtonProps = {
  isEnabled: boolean;
};

const ContinueButton = ({ isEnabled }: ContinueButtonProps) => {
  return isEnabled ? (
    <Link href="/login-password">
      <div className="w-[360px] h-[64px] bg-custom-lime text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-pointer mb-4">
        Continuar
      </div>
    </Link>
  ) : (
    <div className="w-[360px] h-[64px] bg-custom-lime text-black px-4 py-2 rounded-[10px] font-bold text-center pt-4 cursor-not-allowed pointer-events-none mb-4">
      Continuar
    </div>
  );
};

export default ContinueButton;
