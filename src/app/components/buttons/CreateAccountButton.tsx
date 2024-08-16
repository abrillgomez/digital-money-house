import React from "react";
import Link from "next/link";

const CreateAccountButton = () => {
  return (
    <Link href="/login">
      <div className="w-[360px] h-[64px] bg-custom-lime text-black text-center px-4 pt-[18px] rounded-[10px] font-bold">
        Crear cuenta
      </div>
    </Link>
  );
};

export default CreateAccountButton;
