import React from "react";
import Link from "next/link";

const CreateAccountButton = () => {
  return (
    <Link href="/login">
      <div className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-custom-lime text-black text-center px-4 pt-[18px] rounded-[10px] font-bold">
        Crear cuenta
      </div>
    </Link>
  );
};

export default CreateAccountButton;
