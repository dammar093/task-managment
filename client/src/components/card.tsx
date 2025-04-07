import Button from "./button";
import { ITasks } from "../pages/home/home";
import { deleteTask } from "../api/task";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask } from "../redux/slices/taskSlice";

const Card = ({ task }: { task: ITasks }) => {
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //delete task
  const handleDelete = (id: string) => {
    setIsLoading(true);
    deleteTask(id)
      .then((res) => {
        dispatch(removeTask(res.data?.id));
        navigate("/");
      })
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="w-full md:w-[250px] shadow-md p-2 flex flex-col gap-2">
      <h1 className="w-full text-slate-700 font-semibold text-2xl text-center">
        {task?.title}
      </h1>
      <p className="text-md text-slate-500">{task?.description}</p>
      <Button
        className="bg-red-400 hover:bg-red-600"
        type="button"
        title="Delete"
        onClick={() => handleDelete(task?.id)}
        loading={loading}
      />
    </div>
  );
};

export default Card;
