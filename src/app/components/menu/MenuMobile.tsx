/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

interface UserInfo {
  firstname: string;
  lastname: string;
}

interface MenuMobileProps {
  userInfo: UserInfo;
  isLoggedIn: boolean;
  href: string;
}

const menuLinks = [
  { href: "/home", name: "Inicio" },
  { href: "/activity", name: "Actividad" },
  { href: "/profile", name: "Tu perfil" },
  { href: "/transactions", name: "Cargar dinero" },
  { href: "/services", name: "Pagar servicios" },
  { href: "/cards", name: "Tarjetas" },
];

const MenuMobile = ({ userInfo, isLoggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpecialStyle, setIsSpecialStyle] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;
    if (
      !token &&
      (currentPath === "/login" ||
        currentPath === "/create-account" ||
        currentPath === "/login-password")
    ) {
      setIsSpecialStyle(true);
    } else {
      setIsSpecialStyle(false);
    }
  }, []);

  const getInitials = (firstname, lastname) => {
    if (!firstname && !lastname) return "NN";
    return (firstname.charAt(0) || "") + (lastname.charAt(0) || "");
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres cerrar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
    }
  };

  const handleNavigation = (href) => {
    if (
      href === "/login" ||
      href === "/login-password" ||
      href === "/create-account"
    ) {
      window.location.href = href;
    } else {
      setIsOpen(false);
    }
  };

  const handleLogoClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
    } else {
      window.location.href = "/home";
    }
  };

  return (
    <div className="block md:hidden">
      <div
        className={`h-16 flex justify-between items-center px-4 relative ${
          isSpecialStyle ? "bg-custom-lime-dark" : "bg-custom-dark"
        }`}>
        <div className="text-custom-white font-bold">
          <button onClick={handleLogoClick}>
            <img
              src={
                isSpecialStyle
                  ? "/assets/logo-negro.png"
                  : "/assets/logo-verde.png"
              }
              alt="Logo"
              className="h-7 w-auto"
            />
          </button>
        </div>
        <div className="flex items-center space-x-2">
          {isLoggedIn && (
            <div className="bg-custom-lime text-custom-dark font-bold rounded-full w-10 h-10 flex items-center justify-center">
              {getInitials(userInfo.firstname, userInfo.lastname)}
            </div>
          )}
          <button
            onClick={toggleMenu}
            className={`p-2 rounded-full focus:outline-none ${
              isSpecialStyle
                ? "text-custom-dark"
                : "text-custom-lime"
            }`}>
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="absolute left-0 w-full bg-custom-dark text-custom-lime z-10">
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-custom-lime">
              <FaTimes className="w-6 h-6" />
            </button>
          </div>
          <div className="px-4 py-6">
            {!isLoggedIn ? (
              <>
                <a
                  href="/login"
                  className="block px-4 py-2 text-lg hover:bg-custom-lime hover:text-custom-dark hover:font-bold"
                  onClick={() => handleNavigation("/login")}>
                  Ingresar
                </a>
                <a
                  href="/create-account"
                  className="block px-4 py-2 text-lg hover:bg-custom-lime hover:text-custom-dark hover:font-bold"
                  onClick={() => handleNavigation("/create-account")}>
                  Crear cuenta
                </a>
              </>
            ) : (
              <>
                <div className="px-4 text-lg text-custom-white font-bold">
                  <div className="flex flex-col items-start">
                    <div className="text-lg text-custom-lime font-bold">
                      Hola,
                    </div>
                    <div className="text-lg text-custom-lime font-bold">
                      {userInfo.firstname} {userInfo.lastname}
                    </div>
                  </div>
                </div>
                {menuLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 mt-2 text-lg hover:bg-custom-lime hover:text-custom-dark hover:font-bold"
                    onClick={() => setIsOpen(false)}>
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-[400px] text-left block px-4 py-2 mt-2 text-lg hover:bg-custom-lime hover:text-custom-dark hover:font-bold">
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuMobile;
