import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from './App';
import LoginPage from "./Components/LoginPage";
import Dashbord from "./Components/Dashbord";
import Notice from "./Components/Notice";
import AdminLoginPage from './Admin_com/AdminLoginPage.js';
import Admindash from './Admin_com/Admindash.js';
import AdminNotic from "./Admin_com/AdminNotic";
import ViewComplain from "./Admin_com/ViewComplain";
import AdminPhotos from "./Admin_com/Adminphoto";
import Photos from "./Components/Photos";
import Complain from "./Components/Complain";
import Addmember from "./Admin_com/Addmember";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/Dashbord",
    element: <Dashbord />,
  },
  {
    path: "/Notice",
    element: <Notice />,
  },
  {
    path:"/Adminlogin",
    element:<AdminLoginPage />
  },
  {
   path:"/Notic",
   element:<Notice />
  },
  {
    path:"/Complain",
    element:<Complain />
  },
  {
    path:"/Photos",
    element:<Photos />
  },
  {
    path:"/Admindash",
    element:<Admindash />
  },
  {
    path:"/AdminNotic",
    element:<AdminNotic />
  },
  {
    path:"/ViewComplain",
    element:<ViewComplain />
  },
  {
    path:"/Adminphots",
    element:<AdminPhotos />
  },
  {
    path:"/Addmember",
    element:<Addmember />
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
