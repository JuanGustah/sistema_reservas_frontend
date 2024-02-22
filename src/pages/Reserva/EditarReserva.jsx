import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

function EditarReserva() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reserva, setReserva] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    let usuario = JSON.parse(localStorage.getItem("token"));
    let data = new FormData(event.target);
    let data2 = {
      data: data.get("data"),
      dataHoraInicio: data.get("dataHoraInicio"),
      dataHoraTermino: data.get("dataHoraTermino"),
      finalidade: data.get("finalidade"),
      espaco: {
        id: Number(data.get("espaco")),
      },
      status: reserva.status,
      usuario: {
        id: usuario.id,
      },
    };

    try {
      await api.patch("reservas/" + id, data2);
      navigate("/reserva");
    } catch (e) {
      console.log(e);
      alert("Algo errado aconteceu.");
    }
  }

  useEffect(() => {
    api.get("reservas/" + id).then((resposta) => {
      setReserva(resposta.data);
    });
  }, []);

  return (
    <div>
      <h1>Nova Reserva</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Finalidade</label>
        <br />
        <input
          type="text"
          name="finalidade"
          value={reserva.finalidade}
          onChange={(event) => {
            setReserva({ ...reserva, finalidade: event.target.value });
          }}
        />
        <br />
        <label htmlFor="">Data</label>
        <br />
        <input
          type="date"
          name="data"
          value={reserva.data}
          onChange={(event) => {
            setReserva({ ...reserva, data: event.target.value });
          }}
        />
        <br />
        <label htmlFor="">Horário de Inicio</label>
        <br />
        <input
          type="time"
          name="dataHoraInicio"
          value={reserva.dataHoraInicio}
          onChange={(event) => {
            setReserva({ ...reserva, dataHoraInicio: event.target.value });
          }}
        />
        <br />
        <label htmlFor="">Horário de Término</label>
        <br />
        <input
          type="time"
          name="dataHoraTermino"
          value={reserva.dataHoraTermino}
          onChange={(event) => {
            setReserva({ ...reserva, dataHoraTermino: event.target.value });
          }}
        />
        <br />
        <br />
        <button>Reservar</button>
      </form>
    </div>
  );
}

export default EditarReserva;
