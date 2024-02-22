import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function Reservas() {
  let [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let id = JSON.parse(localStorage.getItem("token")).id;

    api.get("reservas/usuario/" + id).then((resposta) => {
      setReservas(resposta.data);
    });
  }, []);

  async function deleteReserva(id) {
    try {
      await api.delete("reservas/" + id);
      setReservas(reservas.filter((reserva) => reserva.id !== id));
    } catch (error) {
      alert("Não foi possível apagar essa reserva");
    }
  }

  return (
    <div>
      <h1>Reservas</h1>
      <button
        onClick={() => {
          navigate("/reserva/novo");
        }}
      >
        Nova Reserva
      </button>
      <br />
      <table>
        <thead>
          <tr>
            <th>Espaço</th>
            <th>Data</th>
            <th>Inicio</th>
            <th>Término</th>
            <th>Finalidade</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((reserva) => (
            <tr key={reserva.id}>
              <td>{reserva.espacoNome}</td>
              <td>{reserva.data}</td>
              <td>{reserva.dataHoraInicio}</td>
              <td>{reserva.dataHoraTermino}</td>
              <td>{reserva.finalidade}</td>
              <td>{reserva.status}</td>
              <td>
                <button
                  onClick={() => {
                    deleteReserva(reserva.id);
                  }}
                >
                  remover
                </button>
                <button
                  onClick={() => {
                    navigate("/reserva/editar/" + reserva.id);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservas;
