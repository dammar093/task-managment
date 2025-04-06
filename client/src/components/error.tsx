const Error = ({ error }: { error: string }) => {
  return (
    <div className="w-full">
      <p className="text-red-500 text-md">{error}</p>
    </div>
  );
};

export default Error;
