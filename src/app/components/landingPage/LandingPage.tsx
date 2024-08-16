import React from "react";
import Card from "../card/Card";

const LandingPage = () => {
  return (
    <div
      className="h-[795px] bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/fondo-home.png')",
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}>
      <div className="flex flex-col justify-start h-full text-white px-8 pt-[150px]">
        <div className="max-w-md">
          <p className="text-[48px] text-left mb-4 leading-[50px] pl-[25px]">
            De ahora en adelante, hacés más con tu dinero
          </p>
          <p className="text-[34px] text-left text-custom-lime pl-[25px]">
            Tu nueva <strong>billetera virtual</strong>
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-4"
        style={{
          height: "246px",
          zIndex: 10,
          bottom: "50px",
          maxWidth: "calc(100% - 32px)",
        }}>
        <Card
          title="Transferí dinero"
          content="Desde Digital Money House vas a poder transferir dinero a otras cuentas, asi como también recibir transferencias y nuclear tu capital en nuestra billetera virtual"
        />
        <Card
          title="Pago de servicios"
          content="Pagá mensualmente los servicios en 3 simples clicks. Facil, rápido y conveniente. Olvidate de las facturas en papel"
        />
      </div>
      <div
        className="absolute bottom-0 left-0 w-full h-[170px] bg-custom-lime rounded-t-[30px] flex items-center justify-center"
        style={{ zIndex: 1 }}></div>
    </div>
  );
};

export default LandingPage;
