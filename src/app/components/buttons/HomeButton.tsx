import React from "react";

interface HomeButtonProps {
  text: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ text }) => {
  return (
    <button className="bg-custom-lime text-bold text-custom-dark w-full md:w-[511px] lg:w-[490px] h-[106px] rounded-md shadow-md hover:bg-custom-lime-dark text-[24px] font-bold">
      {text}
    </button>
  );
};

export default HomeButton;
