import { FC } from "react";

interface ButtonProps {
  title?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  Icon?: React.ReactNode;
}

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  className,
  type = "button",
  loading = false,
  Icon,
}) => {
  return (
    <button
      className={`w-full h-12 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200 ease-in-out cursor-pointer ${className}`}
      onClick={onClick}
      type={type}
      disabled={loading}
      style={{ padding: "0 1rem" }}
    >
      {Icon && <span className="absolute left-3 top-3">{Icon}</span>}
      {loading ? (
        <span className="text-md animate-spintext-center">Loading...</span>
      ) : (
        <span className="text-md text-center">{title}</span>
      )}
    </button>
  );
};

export default Button;
