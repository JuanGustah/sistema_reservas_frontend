import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

function Equipamentos() {
  const { idEspaco } = useParams();
  let [espaco, setEspaco] = useState({});
  let [equipamentos, setEquipamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("espacos/" + idEspaco).then((resposta) => {
      setEspaco(resposta.data);
    });

    api.get("equipamentos/espaco/" + idEspaco).then((resposta) => {
      setEquipamentos(resposta.data);
    });
  }, []);

  async function deleteEquipamento(id) {
    try {
      await api.delete("equipamentos/" + id);
      setEquipamentos(
        equipamentos.filter((equipamento) => equipamento.id !== id)
      );
    } catch (error) {
      alert("Não foi possível apagar essa reserva");
    }
  }

  return (
    <div>
      <h1>Equipamentos de {espaco.nome}</h1>
      <button
        onClick={() => {
          navigate("/equipamento/novo/" + idEspaco);
        }}
      >
        Novo Equipamento
      </button>
      <br />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipamentos.map((equipamento) => (
            <tr key={equipamento.id}>
              <td>{equipamento.nome}</td>
              <td>{equipamento.descricao}</td>
              <td>{equipamento.status ? "Disponível" : "Não Disponível"}</td>
              <td>
                <button
                  onClick={() => {
                    deleteEquipamento(equipamento.id);
                  }}
                >
                  remover
                </button>
                <button
                  onClick={() => {
                    navigate(
                      "/equipamento/editar/" + idEspaco + "/" + equipamento.id
                    );
                  }}
                >
                  Editar
                </button>
                <button>Desabilitar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Equipamentos;
