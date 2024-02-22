import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function Login() {
  const navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();

    let data = new FormData(event.target);
    try {
      let resposta = await api.post("login", {
        email: data.get("email"),
        senha: data.get("senha"),
      });
      localStorage.setItem("token", JSON.stringify(resposta.data));
      navigate("/home");
    } catch (error) {
      alert("Usuário ou senha inválidos.");
    }
  }
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="email" name="email" />
        <br />
        <input type="text" placeholder="senha" name="senha" />
        <br />
        <br />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
