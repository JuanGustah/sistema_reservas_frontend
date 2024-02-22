import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function Espacos() {
  let [espacos, setEspacos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("espacos").then((resposta) => {
      setEspacos(resposta.data);
    });
  }, []);

  async function deleteEspaco(id) {
    try {
      await api.delete("espacos/" + id);
      setEspacos(espacos.filter((espaco) => espaco.id !== id));
    } catch (error) {
      alert("Não foi possível apagar essa reserva");
    }
  }

  return (
    <div>
      <h1>Espaços</h1>
      <button
        onClick={() => {
          navigate("/espaco/novo");
        }}
      >
        Novo Espaço
      </button>
      <br />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Departamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {espacos.map((espaco) => (
            <tr key={espaco.id}>
              <td>{espaco.nome}</td>
              <td>{espaco.tipo}</td>
              <td>{espaco.capacidade}</td>
              <td>{espaco.departamentoNome}</td>
              <td>
                <button
                  onClick={() => {
                    deleteEspaco(espaco.id);
                  }}
                >
                  remover
                </button>
                <button
                  onClick={() => {
                    navigate("/espaco/editar/" + espaco.id);
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    navigate("/equipamentos/" + espaco.id);
                  }}
                >
                  Ver Equipamentos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Espacos;
