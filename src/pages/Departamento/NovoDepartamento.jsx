import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function NovaDepartamento() {
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    let data = new FormData(event.target);

    try {
      await api.post("departamentos", {
        nome: data.get("nome"),
        responsavel: data.get("responsavel"),
        contato: data.get("contato"),
      });
      navigate("/departamento");
    } catch (e) {
      console.log(e);
      alert("Algo errado aconteceu.");
    }
  }

  return (
    <div>
      <h1>Nova Departamento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nome</label>
        <br />
        <input type="text" name="nome" />
        <br />
        <label htmlFor="">Responsável</label>
        <br />
        <input type="text" name="responsavel" />
        <br />
        <label htmlFor="">Contato</label>
        <br />
        <input type="text" name="contato" max="11" />
        <br />
        <br />
        <button>Criar</button>
      </form>
    </div>
  );
}

export default NovaDepartamento;
