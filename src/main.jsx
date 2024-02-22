import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Reservas from "./pages/Reserva/Reservas.jsx";
import NovaReserva from "./pages/Reserva/NovaReserva.jsx";
import EditarReserva from "./pages/Reserva/EditarReserva.jsx";
import Departamentos from "./pages/Departamento/Departamentos.jsx";
import NovaDepartamento from "./pages/Departamento/NovoDepartamento.jsx";
import EditarDepartamento from "./pages/Departamento/EditarDepartamento.jsx";
import Espacos from "./pages/Espaco/Espacos.jsx";
import NovoEspaco from "./pages/Espaco/NovoEspaco.jsx";
import EditarEspaco from "./pages/Espaco/EditarEspaco.jsx";
import Equipamentos from "./pages/Equipamento/Equipamentos.jsx";
import NovoEquipamento from "./pages/Equipamento/NovoEquipamento.jsx";
import EditarEquipamento from "./pages/Equipamento/EditarEquipamento.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "reserva",
        element: <Reservas />,
      },
      {
        path: "reserva/novo",
        element: <NovaReserva />,
      },
      {
        path: "reserva/editar/:id",
        element: <EditarReserva />,
      },
      {
        path: "departamento",
        element: <Departamentos />,
      },
      {
        path: "departamento/novo",
        element: <NovaDepartamento />,
      },
      {
        path: "departamento/editar/:id",
        element: <EditarDepartamento />,
      },
      {
        path: "espaco",
        element: <Espacos />,
      },
      {
        path: "espaco/novo",
        element: <NovoEspaco />,
      },
      {
        path: "espaco/editar/:id",
        element: <EditarEspaco />,
      },
      {
        path: "equipamentos/:idEspaco",
        element: <Equipamentos />,
      },
      {
        path: "equipamento/novo/:idEspaco",
        element: <NovoEquipamento />,
      },
      {
        path: "equipamento/editar/:idEspaco/:idEquipamento",
        element: <EditarEquipamento />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
