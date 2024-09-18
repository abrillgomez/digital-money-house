import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import AuthAPI from "../../../services/auth/auth.service";
import Swal from "sweetalert2";

type ContinueButtonProps = {
  isEnabled: boolean;
  handleSubmit?: () => void; 
};

const ContinueButton = ({ isEnabled, handleSubmit }: ContinueButtonProps) => {
  const [targetUrl, setTargetUrl] = useState("/");
  const { getValues } = useFormContext();
  const [isCardPage, setIsCardPage] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname === "/add-card") {
        setIsCardPage(true);
      } else if (pathname === "/login-password") {
        setTargetUrl("/");
      } else if (pathname === "/login") {
        setTargetUrl("/login-password");
      }
    }
  }, []);

  const handleClick = async () => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      if (pathname === "/login") {
        const email = getValues("email");
        if (email) {
          sessionStorage.setItem("email", email);
          window.location.href = "/login-password";
        }
      } else if (pathname === "/login-password") {
        const email = sessionStorage.getItem("email");
        const password = getValues("password");
        if (email && password) {
          try {
            const response = await AuthAPI.login({ email, password });
            if (response) {
              localStorage.setItem("token", response.token);
              Swal.fire({
                icon: "success",
                title: "¡Inicio de sesión exitoso!",
                text: "Has sido redirigido a la página principal.",
                confirmButtonText: "Aceptar",
              }).then(() => {
                window.location.replace("/home");
              });
            }
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error de autenticación",
              text: "Verifique sus credenciales e intente de nuevo.",
              confirmButtonText: "Aceptar",
            });
          }
        }
      } else if (pathname === "/add-card" && isEnabled && handleSubmit) {
        handleSubmit();
      }
    }
  };

return isCardPage && !isEnabled ? (
    <div className="w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-custom-lime text-black px-4 py-4 rounded-[10px] font-bold text-center pt-4 cursor-not-allowed pointer-events-none mb-4">
      Continuar
    </div>
  ) : (
    <div
      className={"w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-custom-lime text-black px-4 py-4 rounded-[10px] font-bold text-center pt-4 cursor-pointer mb-4"}
      onClick={handleClick}
    >
      Continuar
    </div>
  );
};

export default ContinueButton;
