import { useFormContext } from "react-hook-form";

type InputNumberProps = {
  type: "text" | "password" | "email" | "number";
  fieldName: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputNumber = ({
  type,
  fieldName,
  placeholder,
  value,
  onChange,
}: InputNumberProps) => {
  const { register } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/\D/g, "");
    if (newValue.length <= 19) {
      if (onChange) {
        onChange({
          target: { value: newValue },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(fieldName)}
      value={value}
      onChange={handleChange} // Usar el manejador de cambio
      className={`w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[18px] mb-2`}
    />
  );
};

export default InputNumber;
