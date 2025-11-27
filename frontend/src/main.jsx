import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/HomePage.jsx";
import Login from "./components/Login.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
    errorElement: (
      <div className="text-center mt-[100px] text-2xl">
        <h1 className="text-9xl">404</h1>
        <p className="mt-10">Oops....this page not found!</p>
      </div>
    ),
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={appStore}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
