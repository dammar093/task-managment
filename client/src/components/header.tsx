import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import Button from "./button";
import { useDispatch } from "react-redux";
import { setTasks } from "../redux/slices/taskSlice";

const Header = () => {
  const name = localStorage.getItem("name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <header className="w-full h-16 bg-blue-500">
      <div className="w-full h-full p-2 md:px-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl md:3xl text-white font-semibold">
            Task Management
          </h2>
        </div>
        <div className="text-md font-semibold flex items-center gap-2">
          <p className="text-white">Hello,</p>
          <span className="text-slate-700 capitalize">{name}</span>
          <div>
            <Button
              type="button"
              title="Logout"
              onClick={() => {
                logout().then(() => {
                  dispatch(setTasks([]));
                  localStorage.removeItem("token");
                  localStorage.removeItem("name");
                  navigate("/signin");
                });
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
