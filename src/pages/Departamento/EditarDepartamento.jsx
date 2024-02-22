import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

function EditarDepartamento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departamento, setDepartamento] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    let data = new FormData(event.target);

    try {
      await api.patch("departamentos/" + id, {
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

  useEffect(() => {
    api.get("departamentos/" + id).then((resposta) => {
      setDepartamento(resposta.data);
    });
  }, []);

  return (
    <div>
      <h1>Editar Departamento</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nome</label>
        <br />
        <input
          type="text"
          name="nome"
          value={departamento.nome}
          onChange={(event) => {
            setDepartamento({ ...departamento, nome: event.target.value });
          }}
        />
        <br />
        <label htmlFor="">Responsável</label>
        <br />
        <input
          type="text"
          name="responsavel"
          value={departamento.responsavel}
          onChange={(event) => {
            setDepartamento({
              ...departamento,
              responsavel: event.target.value,
            });
          }}
        />
        <br />
        <label htmlFor="">Contato</label>
        <br />
        <input
          type="text"
          name="contato"
          max="11"
          value={departamento.contato}
          onChange={(event) => {
            setDepartamento({
              ...departamento,
              contato: event.target.value,
            });
          }}
        />
        <br />
        <br />
        <button>Editar</button>
      </form>
    </div>
  );
}

export default EditarDepartamento;
