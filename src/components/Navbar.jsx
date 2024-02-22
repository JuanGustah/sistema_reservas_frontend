import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("token"));
  let isAdminstrativo = user.tipo === "adminstrativo";

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h4>SysReservas</h4>
      <ul
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <li>
          <Link to="/home">Home</Link>
        </li>
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
        <li>
          <button onClick={logout}>Logout</button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
