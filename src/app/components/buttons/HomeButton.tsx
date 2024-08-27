import React from "react";

interface HomeButtonProps {
  text: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ text }) => {
  return (
    <button className="bg-custom-lime text-custom-dark w-[496px] h-[106px] rounded-md shadow-md hover:bg-lime-600 text-[24px] font-bold">
      {text}
    </button>
  );
};

export default HomeButton;
