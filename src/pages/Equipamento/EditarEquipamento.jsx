import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

function EditarEquipamento() {
  const { idEspaco, idEquipamento } = useParams();
  const navigate = useNavigate();
  const [equipamento, setEquipamento] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    let data = new FormData(event.target);

    try {
      await api.patch("equipamentos/" + idEquipamento, {
        nome: data.get("nome"),
        descricao: data.get("descricao"),
        status: equipamento.status,
      });
      navigate("/equipamentos/" + idEspaco);
    } catch (e) {
      console.log(e);
      alert("Algo errado aconteceu.");
    }
  }

  useEffect(() => {
    api.get("equipamentos/" + idEquipamento).then((resposta) => {
      setEquipamento(resposta.data);
    });
  }, []);

  return (
    <div>
      <h1>Editar Equipamento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nome</label>
        <br />
        <input
          type="text"
          name="nome"
          value={equipamento.nome}
          onChange={(event) => {
            setEquipamento({ ...equipamento, nome: event.target.value });
          }}
        />
        <br />
        <label htmlFor="">Descrição</label>
        <br />
        <input
          type="text"
          name="descricao"
          value={equipamento.descricao}
          onChange={(event) => {
            setEquipamento({ ...equipamento, descricao: event.target.value });
          }}
        />
        <br />
        <br />
        <button>Editar</button>
      </form>
    </div>
  );
}

export default EditarEquipamento;
