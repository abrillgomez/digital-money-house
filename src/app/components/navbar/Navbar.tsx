"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import userApi from "../../../services/users/users.service";
import MenuMobile from "../menu/MenuMobile";

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

  const bgColor =
    pathname === "/login" ||
    pathname === "/login-password" ||
    pathname === "/sign-up"
      ? "bg-lime-500"
      : "bg-black";
  const logo =
    pathname === "/login" ||
    pathname === "/login-password" ||
    pathname === "/sign-up"
      ? "/assets/logo-black.png"
      : "/assets/logo.png";

  const getInitials = (firstname, lastname) => {
    if (!firstname && !lastname) return "NN";
    return (firstname.charAt(0) || "") + (lastname.charAt(0) || "");
  };

  return (
    <div>
      <div
        className={`${bgColor} h-16 w-full flex justify-between items-center px-4 hidden md:flex`}>
        <div className="text-white font-bold">
          <Link href={isLoggedIn ? "/home" : "/"}>
            <img
              src={logo}
              alt="Logo"
              className="h-7 w-auto mr-4 pl-0 sm:pl-0"
            />
          </Link>
        </div>
        {!isLoggedIn ? (
          pathname !== "/login" &&
          pathname !== "/login-password" &&
          pathname !== "/sign-up" && (
            <div className="flex space-x-4">
              <Link href="/login">
                <div className="bg-black text-lime-500 px-4 py-2 rounded border border-lime-500 font-bold">
                  Ingresar
                </div>
              </Link>
              <Link href="/sign-up">
                <button className="bg-lime-500 text-black px-4 py-2 rounded font-bold">
                  Crear cuenta
                </button>
              </Link>
            </div>
          )
        ) : (
          <Link href="/home">
            <div className="flex items-center space-x-4">
              <div className="bg-lime-500 text-black font-bold rounded-full w-10 h-10 flex items-center justify-center">
                {getInitials(userInfo.firstname, userInfo.lastname)}
              </div>
              <span className="text-white font-bold">
                Hola, {userInfo.firstname} {userInfo.lastname}
              </span>
            </div>
          </Link>
        )}
      </div>
      <MenuMobile userInfo={userInfo} isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Navbar;
