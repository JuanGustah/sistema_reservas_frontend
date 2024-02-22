import { Link } from "react-router-dom";

function Home() {
  let user = JSON.parse(localStorage.getItem("token"));
  let isAdminstrativo = user.tipo === "adminstrativo";
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>
          <Link to="/reserva">Reservas</Link>
        </li>
        {isAdminstrativo ? (
          <>
            <li>
              <Link to="/departamento">Departamento</Link>
            </li>
            <li>
              <Link to="/espaco">Espaços</Link>
            </li>
          </>
        ) : null}
      </ul>
    </div>
  );
}

export default Home;
