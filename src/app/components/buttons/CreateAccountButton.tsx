import React from "react";

type CreateAccountProps = {
  isEnabled: boolean;
};

const CreateAccountButton = ({ isEnabled }: CreateAccountProps) => {
  return (
    <button
      type="submit"
      disabled={!isEnabled}
      className={`w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] ${
        isEnabled
          ? "bg-custom-lime text-black"
          : "bg-custom-lime text-black cursor-not-allowed"
      } px-4 rounded-[10px] font-bold text-center`}>
      Crear cuenta
    </button>
  );
};

export default CreateAccountButton;
