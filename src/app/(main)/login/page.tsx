import React from "react";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>
      <form className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          className="border border-gray-300 px-4 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="border border-gray-300 px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-lime-500 text-black px-4 py-2 rounded font-bold">
          Ingresar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
