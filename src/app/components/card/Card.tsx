import React from "react";

type CardProps = {
  title: string;
  content: string;
};

const Card: React.FC<CardProps> = ({ title, content }) => {
  return (
    <div className="w-[500px] h-[246px] bg-white rounded-[30px] shadow-lg">
      <div className="p-6">
        <h2 className="text-black text-[34px] font-bold mb-4">{title}</h2>
        <div className="h-1 bg-custom-lime mb-4"></div>
        <p className="text-[20px] font-normal text-black leading-[27.24px]">
          {content}
        </p>
      </div>
    </div>
  );
};

export default Card;
