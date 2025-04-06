import React from "react";

const Form = ({
  onSubmit,
  children,
}: {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}) => {
  return (
    <form
      className="w-full flex items-center justify-center p-2 md:p-8 "
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default Form;
