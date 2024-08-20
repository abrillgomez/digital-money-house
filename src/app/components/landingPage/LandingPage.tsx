import React from "react";
import Card from "../card/Card";

const LandingPage = () => {
  return (
    <div
      className="h-screen bg-cover bg-center relative min-h-[795px]"
      style={{
        backgroundImage: "url('/assets/fondo-home.png')",
      }}>
      <div className="flex flex-col justify-start h-full text-white px-8 pt-16">
        <div className="max-w-md">
          <p className="text-[48px] text-left mb-4">
            De ahora en adelante, hacés más con tu dinero
          </p>
          <p className="text-[34px] text-left text-custom-lime">
            Tu nueva <strong>billetera virtual</strong>
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-[60px] left-1/2 transform -translate-x-1/2 flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-4"
        style={{
          height: "auto",
          zIndex: 10,
          maxWidth: "calc(100% - 32px)",
        }}>
        <Card
          title="Transferí dinero"
          content="Desde Digital Money House vas a poder transferir dinero a otras cuentas, así como también recibir transferencias y nuclear tu capital en nuestra billetera virtual."
        />
        <Card
          title="Pago de servicios"
          content="Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y conveniente. Olvidate de las facturas en papel."
        />
      </div>
      <div
        className="absolute bottom-0 left-0 w-full 
        h-[329px] 
        md:h-[434px] 
        lg:h-[148px] 
        bg-custom-lime rounded-t-[20px] md:rounded-t-[30px] 
        flex items-center justify-center"
        style={{ zIndex: 1 }}></div>
    </div>
  );
};

export default LandingPage;
