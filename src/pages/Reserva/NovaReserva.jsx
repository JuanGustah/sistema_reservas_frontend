import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

function NovaReserva() {
  const navigate = useNavigate();
  const [espacos, setEspacos] = useState([]);

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
      status: "reservado",
      usuario: {
        id: usuario.id,
      },
    };

    try {
      await api.post("reservas", data2);
      navigate("/reserva");
    } catch (e) {
      console.log(e);
      alert("Algo errado aconteceu.");
    }
  }

  useEffect(() => {
    api.get("espacos").then((resposta) => {
      setEspacos(resposta.data);
    });
  }, []);

  return (
    <div>
      <h1>Nova Reserva</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Finalidade</label>
        <br />
        <input type="text" name="finalidade" />
        <br />
        <label htmlFor="">Data</label>
        <br />
        <input type="date" name="data" />
        <br />
        <label htmlFor="">Horário de Inicio</label>
        <br />
        <input type="time" name="dataHoraInicio" />
        <br />
        <label htmlFor="">Horário de Término</label>
        <br />
        <input type="time" name="dataHoraTermino" />
        <br />
        <label htmlFor="">Espaço</label>
        <br />
        <select name="espaco">
          <option selected disabled>
            Selecionar Espaço
          </option>
          {espacos.map((espaco) => (
            <option value={espaco.id} key={espaco.id}>
              {espaco.nome}
            </option>
          ))}
        </select>
        <br />
        <button>Reservar</button>
      </form>
    </div>
  );
}

export default NovaReserva;
