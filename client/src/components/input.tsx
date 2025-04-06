import React, { FC } from "react";

interface InputProps {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  Icon?: React.ReactNode;
  label?: string;
}

const Input: FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  Icon,
  label,
}) => {
  return (
    <div className="w-full  relative text-md font-semibold">
      {label && <label className="text-sm text-gray-700">{label}</label>}
      <input
        type={type}
        className={`w-full h-12 px-2!  border-gray-300  focus:outline-none border-1 focus:border-blue-500 rounded-md text-sm ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      {Icon && <span className="absolute left-3 top-3">{Icon}</span>}
    </div>
  );
};

export default Input;
