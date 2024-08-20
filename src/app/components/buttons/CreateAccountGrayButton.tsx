import React from "react";
import Link from "next/link";

const CreateAccountGrayButton = () => {
  return (
    <Link href="/create-account">
      <div className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-gray-300 text-black px-4 py-2 sm:px-4 sm:py-4 rounded-[10px] font-bold text-center border border-gray-200">
        Crear cuenta
      </div>
    </Link>
  );
};

export default CreateAccountGrayButton;
