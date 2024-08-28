"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import userApi from "../../../services/users/users.service";

const Navbar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ firstname: "", lastname: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      try {
        const payload = token.split(".")[1];
        const decodedPayload = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );
        const username = decodedPayload.username;
        userApi
          .getUserData(token, username)
          .then((userData) => {
            setUserInfo({
              firstname: userData.firstname || "Usuario",
              lastname: userData.lastname || "",
            });
          })
          .catch((error) => {
            console.error("Error al obtener los datos del usuario:", error);
          });
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

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

  const getInitials = (firstname, lastname) => {
    if (!firstname && !lastname) return "NN";
    return (firstname.charAt(0) || "") + (lastname.charAt(0) || "");
  };

  return (
    <div
      className={`${bgColor} h-[64px] w-full flex justify-between items-center px-4`}>
      <div className="text-white font-bold">
        <Link href={isLoggedIn ? "/home" : "/"}>
          <img
            src={logo}
            alt="Logo de Digital Money House"
            className="h-7 w-auto mr-4 pl-0 sm:pl-0"
          />
        </Link>
      </div>
      {!isLoggedIn ? (
        pathname !== "/login" &&
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
        )
      ) : (
        <div className="flex items-center space-x-4">
          <div className="bg-custom-lime text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
            {getInitials(userInfo.firstname, userInfo.lastname)}
          </div>
          <span className="text-white font-bold">
            Hola, {userInfo.firstname} {userInfo.lastname}
          </span>
        </div>
      )}
    </div>
  );
};

export default Navbar;
