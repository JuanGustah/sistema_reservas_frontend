import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

function NovoEspaco() {
  const navigate = useNavigate();
  const [departamentos, setDepartamentos] = useState([]);
  const [fotos, setFotos] = useState([]);
  const [fotoUrl, setFotoUrl] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    let data = new FormData(event.target);
    let dataReq = {
      nome: data.get("nome"),
      capacidade: data.get("capacidade"),
      regrasEspecificas: data.get("regrasEspecificas"),
      tipo: data.get("tipo"),
      departamento: {
        id: Number(data.get("departamento")),
      },
    };

    if (fotos.length > 0) {
      dataReq.fotos = fotos.map((foto) => ({ url: foto }));
    }

    try {
      await api.post("espacos", dataReq);
      navigate("/espaco");
    } catch (e) {
      console.log(e);
      alert("Algo errado aconteceu.");
    }
  }

  function handleFotoSubmit() {
    setFotos((prevValue) => [...prevValue, fotoUrl]);
    setFotoUrl("");
  }

  function handleRemoverFoto(index) {
    let fotosAtualizadas = fotos.filter((_, indexFoto) => indexFoto != index);
    setFotos(fotosAtualizadas);
  }

  useEffect(() => {
    api.get("departamentos").then((resposta) => {
      setDepartamentos(resposta.data);
    });
  }, []);

  return (
    <div>
      <h1>Novo Espaço</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nome</label>
        <br />
        <input type="text" name="nome" />
        <br />
        <label htmlFor="">Capacidade</label>
        <br />
        <input type="number" name="capacidade" />
        <br />
        <label htmlFor="">Regras Específicas</label>
        <br />
        <input type="text" name="regrasEspecificas" />
        <br />
        <label htmlFor="">Tipo de espaço</label>
        <br />
        <select name="tipo">
          <option selected disabled>
            Selecionar Tipo
          </option>
          <option value="sala">Sala</option>
          <option value="laboratorio">Laboratório</option>
          <option value="auditorio">Auditório</option>
        </select>
        <br />
        <label htmlFor="">Departamento</label>
        <br />
        <select name="departamento">
          <option selected disabled>
            Selecionar Departamento
          </option>
          {departamentos.map((departamento) => (
            <option value={departamento.id} key={departamento.id}>
              {departamento.nome}
            </option>
          ))}
        </select>
        <br />

        <div>
          <h4>Fotos</h4>
          <label>Adicionar url</label>
          <br />
          <input
            type="text"
            value={fotoUrl}
            onChange={(event) => setFotoUrl(event.target.value)}
          />
          <button onClick={handleFotoSubmit} type="button">
            Adicionar
          </button>
        </div>
        <br />
        {fotos.map((foto, index) => (
          <div key={index} style={{ display: "flex", gap: "1rem" }}>
            <img src={foto} width={50} height={50} />
            <p>Foto {index}</p>
            <button
              onClick={() => {
                handleRemoverFoto(index);
              }}
              type="button"
            >
              Remover
            </button>
          </div>
        ))}
        <br />

        <button>Cadastrar</button>
      </form>
    </div>
  );
}

export default NovoEspaco;
