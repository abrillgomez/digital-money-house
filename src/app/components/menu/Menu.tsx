"use client";
import Link from "next/link";
import React, { useCallback, useMemo } from "react";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();

  const getLinkClassName = (isActive: boolean) =>
    isActive ? "font-bold text-custom-dark" : "font-semibold text-custom-dark";

  const handleLogout = useCallback(async () => {
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
  }, []);

  const menuLinks = useMemo(
    () => [
      { href: "/home", name: "Inicio" },
      { href: "/activity", name: "Actividad" },
      { href: "/profile", name: "Tu perfil" },
      { href: "/transactions", name: "Cargar dinero" },
      { href: "/services", name: "Pagar servicios" },
      { href: "/cards", name: "Tarjetas" },
    ],
    []
  );

  return (
    <div className="hidden md:block w-[276px] min-h-screen bg-custom-lime text-custom-dark">
      <ul className="pl-10 py-10 space-y-4 w-full">
        {menuLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li className={getLinkClassName(isActive)} key={link.href}>
              <Link href={link.href}>{link.name}</Link>
            </li>
          );
        })}
        <div className="mt-auto mb-4">
          <button
            className="text-custom-dark font-semibold"
            onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Menu;
