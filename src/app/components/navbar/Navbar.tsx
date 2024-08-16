"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const routeStyles = {
    "/login": {
      bgColor: "bg-custom-lime",
      logo: "/assets/logo-negro.png",
    },
    "/login-password": {
      bgColor: "bg-custom-lime",
      logo: "/assets/logo-negro.png",
    },
    "/create-account": {
      bgColor: "bg-custom-lime",
      logo: "/assets/logo-negro.png",
    },
  };

  const defaultStyle = {
    bgColor: "bg-custom-dark",
    logo: "/assets/logo-verde.png",
  };

  const { bgColor, logo } = routeStyles[pathname] || defaultStyle;

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
      {pathname !== "/login" &&
        pathname !== "/login-password" &&
        pathname !== "/create-account" && (
          <div className="flex space-x-4">
            <Link href="/login">
              <div className="text-[14px] bg-transparent text-custom-lime px-4 py-2 rounded border border-custom-lime font-bold">
                Ingresar
              </div>
            </Link>
            <Link href="/create-account">
              <button className="text-[14px] bg-custom-lime text-black px-4 py-2 rounded font-bold">
                Crear cuenta
              </button>
            </Link>
          </div>
        )}
      {pathname === "/create-account" && (
        <Link href="/login">
          <div className="bg-custom-dark text-white px-4 py-2 rounded-[5px] font-bold">
            Iniciar sesión
          </div>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
