import Button from "./button";

const Card = () => {
  return (
    <div className="w-full md:w-[250px] shadow-md p-2 flex flex-col gap-2">
      <h1 className="w-full text-slate-700 font-semibold text-2xl text-center">
        Title
      </h1>
      <p className="text-md text-slate-500">sfsdf</p>
      <Button className="bg-red-400" type="button" title="Delete" />
    </div>
  );
};

export default Card;
