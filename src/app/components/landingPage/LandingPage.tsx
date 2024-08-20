"use client";
import React, { useEffect, useState } from "react";
import Card from "../card/Card";

const LandingPage = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    "/assets/fondo-home.png"
  );

  useEffect(() => {
    const updateBackgroundImage = () => {
      if (window.matchMedia("(max-width: 639px)").matches) {
        setBackgroundImage("/assets/fondo-home-mobile.png");
      } else if (window.matchMedia("(max-width: 834px)").matches) {
        setBackgroundImage("/assets/fondo-home-tablet.png");
      } else {
        setBackgroundImage("/assets/fondo-home.png");
      }
    };

    updateBackgroundImage();
    window.addEventListener("resize", updateBackgroundImage);
    return () => window.removeEventListener("resize", updateBackgroundImage);
  }, []);

  return (
    <div
      className="h-[795px] bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center top",
        backgroundSize: "cover",
      }}>
      <div className="flex flex-col justify-start h-full text-white">
        <div className="max-w-md">
          <p
            className="text-[27px] font-[600]
            leading-[32px]
            text-left mb-4 pl-[25px] left-[50px]
            pt-[20px]
            w-[190px]
            h-[93px]
            sm:text-[48px]
            sm:font-normal
            sm:leading-[50px]
            sm:pt-[50px]
            sm:w-auto
            sm:h-auto
          ">
            De ahora en adelante, hacés más con tu dinero
          </p>
          <p
            className="text-[21.5px] font-[400] leading-[30.5px]
            text-left text-custom-lime pl-[25px] pb-4 pt-[60px]
            w-[248px] h-[59px]
            sm:text-[34px]
            sm:font-normal
            sm:leading-[40px]
            sm:w-auto
            sm:h-auto
            sm:pt-0
          ">
            Tu nueva <strong>billetera virtual</strong>
          </p>
        </div>
      </div>
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col space-y-4 md:space-y-6 lg:flex-row lg:space-x-4 lg:justify-center"
        style={{
          height: "246px",
          zIndex: 10,
          bottom: "34px",
          maxWidth: "calc(100% - 32px)",
          marginTop: 0,
          margin: 0,
        }}>
        <Card
          title="Transferí dinero"
          content="Desde Digital Money House vas a poder transferir dinero a otras cuentas, así como también recibir transferencias y nuclear tu capital en nuestra billetera virtual"
        />
        <Card
          title="Pago de servicios"
          content="Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y conveniente. Olvidate de las facturas en papel"
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
