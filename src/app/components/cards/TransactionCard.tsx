import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface TransactionCardProps {
  icon: IconProp;
  text: string;
  onClick: () => void;
}

const TransactionCard = ({ icon, text, onClick }: TransactionCardProps) => {
  return (
    <div
      className="flex justify-between items-center bg-custom-dark text-custom-lime p-4 rounded-lg mb-8 cursor-pointer hover:bg-custom-dark-dark transition duration-300 w-[1006px] h-[157px]"
      onClick={onClick}>
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={icon}
          className="text-custom-lime mr-4"
          size="2x"
        />
        <span className="text-xl font-semibold">{text}</span>
      </div>
      <FontAwesomeIcon
        icon={faArrowRight}
        className="text-custom-lime"
        size="lg"
      />
    </div>
  );
};

export default TransactionCard;
