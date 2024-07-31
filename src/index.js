import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { Button, ConfigProvider, Space } from "antd";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import UserPage from "./components/UserPage";
import Login from "./components/Login";
import Scanner from "./components/Scanner";
import LandingPage from "./components/LandingPage";
import Registration from "./components/Registration";
import Shope from "./components/Shope";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/scanner",
    element: <Scanner />,
  },
  {
    path: "/shope",
    element: <Shope />,
  },
  {
    path: "/user-page",
    element: (
      <UserPage
        user={{
          username: "Mohamed",
          phone: "+212 708 - 010952",
          plastic: 215,
          glass: 40,
          paper: 110,
          metal: 60,
        }}
      />
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#018000",
      },
    }}
  >
    {/* <React.StrictMode> */}
    <RouterProvider router={router} />
    {/* </React.StrictMode> */}
  </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
