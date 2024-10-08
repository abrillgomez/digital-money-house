import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MeansOfPaymentButton = () => {
  return (
    <Link href="/cards">
      <button className="flex items-center justify-between h-[116px] mt-6 p-4 bg-custom-lime hover:bg-custom-lime-dark text-custom-dark rounded-lg shadow-lg w-[350px] sm:w-[511px] lg:w-[1003px]">
        <span className="font-bold">Gestioná los medios de pago</span>
        <FontAwesomeIcon icon={faArrowRight} className="text-custom-dark" />
      </button>
    </Link>
  );
};

export default MeansOfPaymentButton;
