import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MeansOfPaymentButton = () => {
  return (
    <button className="flex items-center justify-between w-[1006px] h-[116px] mt-6 p-6 bg-custom-lime hover:bg-custom-lime-dark text-black rounded-lg shadow-lg">
      <span className="font-bold text-[20px]">Gestioná los medios de pago</span>
      <FontAwesomeIcon icon={faArrowRight} className="text-black" />
    </button>
  );
};

export default MeansOfPaymentButton;
