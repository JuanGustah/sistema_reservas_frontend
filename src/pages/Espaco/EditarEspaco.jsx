import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import { useEffect, useState } from "react";

function EditarEspaco() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fotos, setFotos] = useState([]);
  const [fotoUrl, setFotoUrl] = useState("");
  const [espaco, setEspaco] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();

    let data = new FormData(event.target);
    let dataReq = {
      nome: data.get("nome"),
      capacidade: data.get("capacidade"),
      regrasEspecificas: data.get("regrasEspecificas"),
      tipo: data.get("tipo"),
    };

    if (fotos.length > 0) {
      dataReq.fotos = fotos.map((foto) => ({ url: foto }));
    } else {
      dataReq.fotos = null;
    }

    try {
      await api.patch("espacos/" + id, dataReq);
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
    api.get("espacos/" + id).then((resposta) => {
      setEspaco(resposta.data);

      setFotos(resposta.data.fotos.map((foto) => foto.url));
    });
  }, []);

  return (
    <div>
      <h1>Editar Espaço</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Nome</label>
        <br />
        <input
          type="text"
          name="nome"
          value={espaco.nome}
          onChange={(event) => {
            setEspaco({ ...espaco, nome: event.target.value });
          }}
        />
        <br />
        <label htmlFor="">Capacidade</label>
        <br />
        <input
          type="number"
          name="capacidade"
          value={espaco.capacidade}
          onChange={(event) => {
            setEspaco({ ...espaco, capacidade: event.target.value });
          }}
        />
        <br />
        <label htmlFor="">Regras Específicas</label>
        <br />
        <input
          type="text"
          name="regrasEspecificas"
          value={espaco.regrasEspecificas}
          onChange={(event) => {
            setEspaco({ ...espaco, regrasEspecificas: event.target.value });
          }}
        />
        <br />
        <label htmlFor="">Tipo de espaço</label>
        <br />
        <select
          name="tipo"
          value={espaco.tipo}
          onChange={(event) => {
            setEspaco({ ...espaco, tipo: event.target.value });
          }}
        >
          <option selected disabled>
            Selecionar Tipo
          </option>
          <option value="sala">Sala</option>
          <option value="laboratorio">Laboratório</option>
          <option value="auditorio">Auditório</option>
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

export default EditarEspaco;
