"use client";
import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";

const Menu = () => {
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
    { href: "/actividad", name: "Actividad" },
    { href: "/perfil", name: "Tu perfil" },
    { href: "/transacciones", name: "Cargar dinero" },
    { href: "/servicios", name: "Pagar servicios" },
    { href: "/tarjetas", name: "Tarjetas" },
  ];

  return (
    <div className="w-[276px] h-screen bg-lime-500 text-black">
      <ul className="pl-10 py-10 space-y-4 w-full">
        {menuLinks.map((link, index) => (
          <li className="text-total-black" key={`option-menu-${index}`}>
            <Link href={link.href}>{link.name}</Link>
          </li>
        ))}
        <button className="text-total-black" onClick={() => handleLogout()}>
          Cerrar sesión
        </button>
      </ul>
    </div>
  );
};

export default Menu;
