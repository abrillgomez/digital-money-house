import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-custom-dark h-[64px] w-full flex justify-between items-center px-4">
      <div className="text-white font-bold">
        <Link href="/">
          <img
            src="/assets/logo-verde.png"
            alt="Logo de Digital Money House"
            className="h-7 w-auto mr-4"
          />
        </Link>
      </div>
      <div className="flex space-x-4">
        <button className="text-[14px] bg-transparent text-custom-lime px-4 py-2 rounded border border-custom-lime font-bold">
          Ingresar
        </button>
        <button className="text-[14px] bg-custom-lime text-black px-4 py-2 rounded font-bold">
          Crear cuenta
        </button>
      </div>
    </div>
  );
};

export default Navbar;
