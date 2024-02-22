import { useEffect, useRef, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function Reservas() {
  let [reservas, setReservas] = useState([]);
  // let [penalizarId, setPenalizarId] = useState(0);
  let dialog = useRef();
  const navigate = useNavigate();

  let user = JSON.parse(localStorage.getItem("token"));
  let isAdminstrativo = user.tipo === "adminstrativo";

  useEffect(() => {
    if (isAdminstrativo) {
      console.log(true);

      api.get("reservas").then((resposta) => {
        setReservas(resposta.data);
      });
    } else {
      let id = user.id;

      api.get("reservas/usuario/" + id).then((resposta) => {
        setReservas(resposta.data);
      });
    }
  }, []);

  async function deleteReserva(id) {
    try {
      await api.delete("reservas/" + id);
      setReservas(reservas.filter((reserva) => reserva.id !== id));
    } catch (error) {
      alert("Não foi possível apagar essa reserva");
    }
  }

  async function penalizarReserva(event) {
    event.preventDefault();

    let id = dialog.current.dataset.id;

    let formData = new FormData(event.target);
    try {
      await api.post("penalidades/" + id, {
        justificativa: formData.get("justificativa"),
      });
      delete dialog.current.dataset.id;
      dialog.current.close();

      setReservas(
        reservas.map((reserva) => {
          if (reserva.id == id) {
            reserva.status = "penalizado";
          }
          return reserva;
        })
      );
    } catch (error) {
      alert("Não foi possível apagar essa reserva");
    }
  }

  return (
    <div>
      <dialog ref={dialog}>
        <p>Penalizar reserva?</p>
        <form onSubmit={penalizarReserva}>
          <label htmlFor="">Justificativa</label>
          <br />
          <input type="text" name="justificativa" />
          <br />
          <br />
          <button>OK</button>
        </form>
      </dialog>
      <h1>Reservas</h1>
      {!isAdminstrativo ? (
        <>
          <button
            onClick={() => {
              navigate("/reserva/novo");
            }}
          >
            Nova Reserva
          </button>
          <br />
        </>
      ) : null}
      <table>
        <thead>
          <tr>
            <th>Espaço</th>
            <th>Data</th>
            <th>Inicio</th>
            <th>Término</th>
            <th>Finalidade</th>
            <th>Status</th>
            <th>Justificativa da Penalidade</th>
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
              <td>{reserva.penalidade?.justificativa}</td>
              <td>
                {!isAdminstrativo ? (
                  <>
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
                  </>
                ) : (
                  <button
                    disabled={reserva.status == "penalizado"}
                    onClick={() => {
                      // penalizarReserva(reserva.id);
                      dialog.current.dataset.id = reserva.id;
                      dialog.current.showModal();
                    }}
                  >
                    Penalizar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reservas;
