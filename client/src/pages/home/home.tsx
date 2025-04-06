import { useEffect, useState } from "react";
import AddTask from "../../components/add-task";
import Button from "../../components/button";
import Card from "../../components/card";
import Header from "../../components/header";
import { getTasks } from "../../api/task";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setTasks } from "../../redux/slices/taskSlice";

export interface ITasks {
  title: string;
  description: string;
  id: string;
}
const Home = () => {
  const [popUp, setPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const handlePopUp = () => {
    setPopUp(true);
  };

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then((res) => {
        console.log(res.data);
        dispatch(setTasks(res.data));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <section className="w-full h-full relative">
      <Header />
      <main className="w-full p-2 relative">
        <div className="w-fit my-1 float-end">
          <Button type="button" title="Add task" onClick={handlePopUp} />
        </div>
        {loading ? (
          <div className="w-full h-[500] text-3xl flex justify-center items-center">
            <span>Loading...</span>
          </div>
        ) : (
          <div className="w-full grid gap-2 grid-cols-1 md:grid-cols-4 lg:grid-cols-5 p-2">
            {tasks?.map((task: ITasks) => (
              <Card task={task} key={task?.id} />
            ))}
          </div>
        )}
      </main>
      {popUp && (
        <div className="absolute h-screen w-full bg-slate-950/70 top-0 flex justify-center items-center">
          <div className="w-full md:w-1/2">
            <AddTask setPopUp={setPopUp} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
