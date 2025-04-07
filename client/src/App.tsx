import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getTasks } from "./api/task";
import { setLoading, setTasks } from "./redux/slices/taskSlice";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    getTasks()
      .then((res) => {
        console.log(res.data);
        dispatch(setTasks(res.data));
        dispatch(setLoading(true));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);
  return <Outlet />;
};

export default App;
