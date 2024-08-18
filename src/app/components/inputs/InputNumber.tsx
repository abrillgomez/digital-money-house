import { useFormContext } from "react-hook-form";

type InputNumberProps = {
  type: "text" | "password" | "email" | "number";
  fieldName: string;
  placeholder?: string;
};

const InputNumber = ({ type, placeholder, fieldName }: InputNumberProps) => {
  const { register } = useFormContext();

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(fieldName)}
      className="w-[360px] h-[64px] bg-white-500 border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[18px] mb-2"
    />
  );
};

export default InputNumber;
