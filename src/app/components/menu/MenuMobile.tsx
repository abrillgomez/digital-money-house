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
}

const menuLinks = [
  { href: "/home", name: "Inicio" },
  { href: "/activity", name: "Actividad" },
  { href: "/profile", name: "Tu perfil" },
  { href: "/transactions", name: "Cargar dinero" },
  { href: "/services", name: "Pagar servicios" },
  { href: "/cards", name: "Tarjetas" },
];

const MenuMobile = ({ userInfo, isLoggedIn }: MenuMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpecialStyle, setIsSpecialStyle] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;
    setIsSpecialStyle(
      !token &&
        ["/login", "/create-account", "/login-password"].includes(currentPath)
    );
  }, []);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const getInitials = (firstname: string, lastname: string) => {
    if (!firstname && !lastname) return "NN";
    return (firstname.charAt(0) || "") + (lastname.charAt(0) || "");
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Quieres cerrar sesión.",
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

  const handleNavigation = (href: string) => {
    window.location.href = href;
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    window.location.href = localStorage.getItem("token") ? "/home" : "/";
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
              isSpecialStyle ? "text-custom-dark" : "text-custom-lime"
            }`}>
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </div>
      {isOpen && (
        <>
          <div
            onClick={toggleMenu}
            className="fixed inset-0 bg-black opacity-50 z-20"
          />
          <div className="absolute left-0 top-0 w-full min-h-screen z-30 flex flex-col">
            <div
              className={`p-4 ${
                isLoggedIn ? "bg-custom-dark" : "bg-custom-dark"
              }`}>
              <div className="flex justify-between items-start w-[100%]">
                <div className="flex flex-col items-start mt-[40px] px-4 mb-2">
                  {isLoggedIn && (
                    <>
                      <span className="text-lg font-bold text-custom-lime">
                        Hola,
                      </span>
                      <span className="text-lg font-bold text-custom-lime">
                        {`${userInfo.firstname} ${userInfo.lastname}`}
                      </span>
                    </>
                  )}
                </div>
                {isLoggedIn && (
                  <button onClick={toggleMenu} className="text-custom-lime">
                    <FaTimes className="w-6 h-6" />
                  </button>
                )}
              </div>
              {!isLoggedIn && (
                <div className="mt-4">
                  <Link
                    href="/login"
                    className="block px-4 py-2 bg-custom-dark text-custom-lime text-lg font-semibold hover:font-bold rounded-md"
                    onClick={() => handleNavigation("/login")}>
                    Ingresar
                  </Link>
                  <Link
                    href="/create-account"
                    className="block mt-2 px-4 py-2 bg-custom-dark text-custom-lime text-lg font-semibold hover:font-bold rounded-md"
                    onClick={() => handleNavigation("/create-account")}>
                    Crear cuenta
                  </Link>
                </div>
              )}
            </div>
            <div
              className={`flex-1 p-4 text-custom-dark ${
                isLoggedIn ? "bg-custom-lime" : "bg-custom-dark"
              }`}>
              {isLoggedIn &&
                menuLinks.map(({ href, name }) => (
                  <Link
                    key={href}
                    href={href}
                    className="block px-6 py-2 mt-2 text-lg font-semibold hover:font-bold rounded-md"
                    onClick={() => handleNavigation(href)}>
                    {name}
                  </Link>
                ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="w-full text-left block px-6 py-2 mt-2 text-lg font-semibold bg-custom-lime text-custom-dark hover:font-bold rounded-md">
                  Cerrar sesión
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuMobile;
