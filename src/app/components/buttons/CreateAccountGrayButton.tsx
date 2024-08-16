import React from "react";
import Link from "next/link";

const CreateAccountGrayButton = () => {
  return (
    <Link href="/create-account">
      <div className="w-[360px] h-[64px] bg-gray-300 text-black px-4 py-2 rounded-[10px] font-bold text-center border border-gray-200 pt-4">
        Crear cuenta
      </div>
    </Link>
  );
};

export default CreateAccountGrayButton;
