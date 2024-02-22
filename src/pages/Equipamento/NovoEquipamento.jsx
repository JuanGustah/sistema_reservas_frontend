import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";

function NovoEquipamento() {
  const { idEspaco } = useParams();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    let data = new FormData(event.target);

    try {
      await api.post("equipamentos", {
        nome: data.get("nome"),
        descricao: data.get("descricao"),
        status: true,
        espaco: {
          id: Number(idEspaco),
        },
      });
      navigate("/equipamentos/" + idEspaco);
    } catch (e) {
      console.log(e);
      alert("Algo errado aconteceu.");
    }
  }

  return (
    <div>
      <h1>Novo Equipamento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nome</label>
        <br />
        <input type="text" name="nome" />
        <br />
        <label htmlFor="">Descrição</label>
        <br />
        <input type="text" name="descricao" />
        <br />
        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default NovoEquipamento;
