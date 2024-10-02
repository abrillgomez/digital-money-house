import { useFormContext } from "react-hook-form";

type InputTextProps = {
  type: "text" | "password" | "email" | "number";
  fieldName: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputText = ({
  type,
  fieldName,
  placeholder,
  value,
  onChange,
}: InputTextProps) => {
  const { register } = useFormContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^a-zA-ZÀ-ÖØ-Ýà-öø-ÿÑñ\s]/g, "");
    if (onChange) {
      onChange({
        target: { value: newValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      {...register(fieldName)}
      value={value}
      onChange={handleChange}
      className={`w-[300px] h-[50px] sm:w-[360px] sm:h-[64px] bg-white border border-gray-300 px-4 py-2 rounded-[10px] text-black text-[18px] mb-2`}
      autoFocus
    />
  );
};

export default InputText;
