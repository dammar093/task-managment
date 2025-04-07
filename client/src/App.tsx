import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getTasks } from "./api/task";
import { setTasks } from "./redux/slices/taskSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getTasks()
      .then((res) => {
        console.log(res.data);
        dispatch(setTasks(res.data));
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);
  return <Outlet />;
};

export default App;
