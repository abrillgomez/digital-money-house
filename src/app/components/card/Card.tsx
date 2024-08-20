import React from "react";

type CardProps = {
  title: string;
  content: string;
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="m-0 h-[220px] sm:h-[250px] lg:h-[246px] w-[300px] sm:w-[400px] lg:w-[500px] bg-white rounded-[20px] sm:rounded-[30px] shadow-lg">
      <div className="p-4 sm:p-6">
        <h2 className="sm:text-[24px] lg:text-[34px] text-black font-bold mb-2 sm:mb-4">
          {title}
        </h2>
        <div className="h-1 bg-custom-lime mb-2 sm:mb-4"></div>
        <p className="text-[16px] sm:text-[20px] font-normal text-black leading-[27.24px]">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Card;
