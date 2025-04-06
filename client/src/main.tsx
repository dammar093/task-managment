import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import SignUp from "./pages/auth/singup.tsx";
import SignIn from "./pages/auth/signin.tsx";
import Home from "./pages/home/home.tsx";
import store from "./redux/store.ts";
import Auth from "./components/authLayout.ts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Auth>
            <Home />
          </Auth>
        ),
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
