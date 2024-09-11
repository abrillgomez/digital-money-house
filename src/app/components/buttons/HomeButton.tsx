import React from "react";

interface HomeButtonProps {
  text: string;
  href: string;
}

const HomeButton: React.FC<HomeButtonProps> = ({ text, href }) => {
  return (
    <a
      href={href}
      className="bg-custom-lime text-bold text-custom-dark w-full md:w-[511px] lg:w-[490px] h-[106px] rounded-md shadow-md hover:bg-custom-lime-dark text-[24px] font-bold flex items-center justify-center">
      {text}
    </a>
  );
};

export default HomeButton;
