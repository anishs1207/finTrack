import { createRoot } from "react-dom/client";
import { Route } from "react-router-dom";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import './index.css';

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {Layout} from "./components/Structure";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact-us" element={<Contact />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="dashboard" element={<Dashboard />} />
    </Route>
  ));

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
