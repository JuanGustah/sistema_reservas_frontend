import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token") && location.pathname !== "/") {
      navigate("/");
    }
  }, [navigate, location]);

  if (location.pathname === "/" || location.pathname === "/guard") {
    return <Outlet />;
  }

  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
}

export default App;
