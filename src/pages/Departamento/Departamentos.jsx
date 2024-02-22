import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

function Departamentos() {
  let [departamentos, setDepartamentos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("departamentos").then((resposta) => {
      setDepartamentos(resposta.data);
    });
  }, []);

  async function deleteDepartamento(id) {
    try {
      await api.delete("departamentos/" + id);
      setDepartamentos(
        departamentos.filter((departamento) => departamento.id !== id)
      );
    } catch (error) {
      alert("Não foi possível apagar essa reserva");
    }
  }

  return (
    <div>
      <h1>Departamentos</h1>
      <button
        onClick={() => {
          navigate("/departamento/novo");
        }}
      >
        Novo Departamento
      </button>
      <br />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Responsável</th>
            <th>Contato</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {departamentos.map((departamento) => (
            <tr key={departamento.id}>
              <td>{departamento.nome}</td>
              <td>{departamento.responsavel}</td>
              <td>{departamento.contato}</td>
              <td>
                <button
                  onClick={() => {
                    deleteDepartamento(departamento.id);
                  }}
                >
                  remover
                </button>
                <button
                  onClick={() => {
                    navigate("/departamento/editar/" + departamento.id);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Departamentos;
