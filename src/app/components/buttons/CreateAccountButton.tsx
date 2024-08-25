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
          ? "bg-custom-lime text-black pt-2"
          : "bg-custom-lime text-black cursor-not-allowed pt-2"
      } px-4 py-2 rounded-[10px] font-bold text-center mb-2`}>
      Crear cuenta
    </button>
  );
};

export default CreateAccountButton;
