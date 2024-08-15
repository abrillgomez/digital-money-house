"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const bgColor = pathname === "/login" ? "bg-lime-500" : "bg-black";
  const logo =
    pathname === "/login" ? "/assets/logo-negro.png" : "/assets/logo-verde.png";

  return (
    <div
      className={`${bgColor} h-[64px] w-full flex justify-between items-center px-4`}>
      <div className="text-white font-bold">
        <Link href="/">
          <img
            src={logo}
            alt="Logo de Digital Money House"
            className="h-7 w-auto mr-4"
          />
        </Link>
      </div>
      {pathname !== "/login" && (
        <div className="flex space-x-4">
          <Link href="/login">
            <div className="text-[14px] bg-transparent text-custom-lime px-4 py-2 rounded border border-custom-lime font-bold">
              Ingresar
            </div>
          </Link>
          <button className="text-[14px] bg-custom-lime text-black px-4 py-2 rounded font-bold">
            Crear cuenta
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
