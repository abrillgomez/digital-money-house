import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import AuthAPI from "../../../services/auth/auth.service";
import Swal from "sweetalert2";

type ContinueButtonProps = {
  isEnabled: boolean;
  handleSubmit?: () => void;
};

const ContinueButton: React.FC<ContinueButtonProps> = ({
  isEnabled,
  handleSubmit,
}) => {
  const { getValues } = useFormContext();
  const [targetUrl, setTargetUrl] = useState("/");
  const [isCardPage, setIsCardPage] = useState(false);

  useEffect(() => {
    const pathname = window.location.pathname;

    if (pathname === "/add-card") {
      setIsCardPage(true);
    } else if (pathname === "/login-password") {
      setTargetUrl("/");
    } else if (pathname === "/login") {
      setTargetUrl("/login-password");
    }
  }, []);

  const handleClick = async () => {
    if (!isEnabled) return;

    const pathname = window.location.pathname;

    if (pathname === "/login") {
      const email = getValues("email");
      if (email) {
        sessionStorage.setItem("email", email);
        window.location.href = targetUrl;
      }
    } else if (pathname === "/login-password") {
      const email = sessionStorage.getItem("email");
      const password = getValues("password");
      if (email && password) {
        await handleLogin(email, password);
      }
    } else if (isCardPage && handleSubmit) {
      handleSubmit();
    }
  };

  const handleLogin = async (email: string, password: string) => {
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
  };

  return (
    <div
      className={`w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-custom-lime text-black px-4 pt-3 rounded-[10px] font-bold text-center cursor-pointer mb-4 ${
        !isEnabled && isCardPage ? "cursor-not-allowed pointer-events-none" : ""
      }`}
      onClick={handleClick}>
      Continuar
    </div>
  );
};

export default ContinueButton;
