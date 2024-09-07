import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const AddCardButton = () => {
  return (
    <Link href="/add-card">
      <div
        className="bg-black text-white p-6 rounded-lg flex justify-between items-center w-[350px] sm:w-[511px] lg:w-[1006px] h-[167px] mb-6"
        style={{ cursor: "pointer" }}>
        <div>
          <p className="text-[16px] font-bold">
            Agregá tu tarjeta de débito o crédito
          </p>
          <div className="flex items-center mt-8">
            <FontAwesomeIcon
              icon={faPlus}
              className="text-custom-lime text-s mr-2"
              style={{ width: "34px", height: "34px" }}
            />
            <p className="text-[20px] font-bold text-custom-lime">
              Nueva tarjeta
            </p>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="w-6 h-6 text-custom-lime mt-[62px]"
        />
      </div>
    </Link>
  );
};

export default AddCardButton;
