type InputNumberProps = {
  type: "text" | "password" | "email" | "number";
  fieldName: string;
  placeholder?: string;
};

const InputNumber = ({ type, placeholder }: InputNumberProps) => {

  return (
    <input
      type={type}
      placeholder={placeholder}
      className="hide-arrow p-3 my-3 md:my-4 w-full rounded-lg bg-total-white border border-light-primary"
    />
  );
};

export default InputNumber;
