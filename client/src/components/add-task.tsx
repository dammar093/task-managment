import { FC, useState } from "react";
import Button from "./button";
import Form from "./form";
import Input from "./input";
import { createTask } from "../api/task";
import { useNavigate } from "react-router-dom";

interface AddTaskProps {
  setPopUp: (value: boolean) => void;
}
const AddTask: FC<AddTaskProps> = ({ setPopUp }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isLoadin, setIsLoading] = useState(false);
  const navigate = useNavigate();

  //submit task
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!formData.title?.trim() && !formData.description?.trim()) return;
    createTask(formData)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.error(err.response?.data?.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="w-full p-2 md:p-4 bg-white relative rounded-md ">
      <Form onSubmit={handleSubmit}>
        <div className="w-full flex flex-col gap-3">
          <div className="w-full">
            <Input
              type="text"
              placeholder="Enter title."
              value={formData?.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>
          <div className="w-full">
            <textarea
              cols={20}
              rows={4}
              className="w-full  border-gray-300 resize-none  focus:outline-none border-1 focus:border-blue-500 rounded-md text-sm"
              placeholder="Enter description."
              value={formData?.description}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            ></textarea>
          </div>
          <div className="w-full">
            <Button type="submit" title="Add Task" loading={isLoadin} />
          </div>
        </div>
      </Form>
      <button
        type="button"
        className="absolute top-1 right-1 text-xl text-red-500 font-semibold cursor-pointer"
        onClick={() => {
          setPopUp(false);
        }}
      >
        X
      </button>
    </div>
  );
};

export default AddTask;
