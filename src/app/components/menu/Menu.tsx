"use client";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      sessionStorage.removeItem("email");
      window.location.replace("/");
    }
  };

  const menuLinks = [
    { href: "/home", name: "Inicio" },
    { href: "/activity", name: "Actividad" },
    { href: "/profile", name: "Tu perfil" },
    { href: "/transactions", name: "Cargar dinero" },
    { href: "/services", name: "Pagar servicios" },
    { href: "/cards", name: "Tarjetas" },
  ];

  return (
    <div className="w-[276px] min-h-screen bg-custom-lime text-custom-dark">
      <ul className="pl-10 py-10 space-y-4 w-full">
        {menuLinks.map((link, index) => {
          const isActive = pathname === link.href;
          return (
            <li
              className={`${
                isActive ? "font-bold" : "font-semibold"
              } text-custom-dark`}
              key={`option-menu-${index}`}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          );
        })}
        <button
          className="text-custom-dark font-semibold"
          onClick={handleLogout}>
          Cerrar sesión
        </button>
      </ul>
    </div>
  );
};

export default Menu;
