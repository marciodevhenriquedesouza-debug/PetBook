import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../api";
import "./Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const [modo, setModo] = useState("login");
  const [animando, setAnimando] = useState(false);
  const [saindo, setSaindo] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [erro, setErro] = useState("");

  function trocar(novoModo) {
    if (novoModo === modo || animando) return;
    setErro('')
    setAnimando(true);
    setSaindo(true);

    setTimeout(() => {
      setModo(novoModo);
      setSaindo(false);
      setAnimando(false);
    }, 3000);
  }
async function handleLogin() {
  setErro('')
  const data = await login(email, password)

  if (data.erro) {
    setErro(data.erro)
    return
  }

  localStorage.setItem('token', data.token)
  localStorage.setItem('usuario', JSON.stringify(data.usuario))
  navigate('/feed')
}
async function handleRegister() {
  setErro('')
  const data = await register(nome, email, idade, password)

  if (data.erro) {
    setErro(data.erro)
    return
  }

  // cadastro ok — vai pro login
  trocar('login')
}
  const isLogin = modo === "login";

  return (
    <div className="auth-page">
      <div className={`auth-card ${isLogin ? "modo-login" : "modo-register"}`}>
        {/* PAINEL FORMULÁRIO */}
        {/* PAINEL FORMULÁRIO */}
        <div className={`painel-form ${saindo ? "saindo" : ""}`}>
          <div className="painel-form-inner">
            <h1>{isLogin ? "Login" : "Cadastro"}</h1>

            {!isLogin && (
              <div className="campo">
                <input type="text" placeholder="Nome completo" value={nome} onChange={e => setNome(e.target.value)} />
              </div>
            )}

            <div className="campo">
              <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            {!isLogin && (
              <div className="campo">
                <input type="number" placeholder="Idade" value={idade} onChange={e => setIdade(e.target.value)} />
              </div>
            )}

            <div className="campo">
              <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
            </div>

            {erro && <p style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'center' }}>{erro}</p>} 

            <button className="btn-main" onClick={isLogin ? handleLogin : handleRegister}>
              {isLogin ? "Entrar" : "Criar conta"}
            </button>

            <p className="switch-text">
              {isLogin ? "Não tem conta? " : "Já tem conta? "}
              <span onClick={() => trocar(isLogin ? "register" : "login")}>
                {isLogin ? "Criar conta" : "Entrar"}
              </span>
            </p>
          </div>
        </div>

        {/* PAINEL COLORIDO */}
        {/* PAINEL COLORIDO */}
        <div className={`painel-color ${animando ? "animando" : ""}`}>
          <div className={`painel-color-inner ${saindo ? "saindo" : ""}`}>
            <div className="paw-icon">
              <img src="/logo.png" alt="PetBook logo" />
            </div>
            <h2>{isLogin ? "Olá,\nBem-vindo!" : "Bem-vindo\nde volta!"}</h2>
            <p>
              {isLogin
                ? "Não tem uma conta ainda? Cadastre-se e junte-se à comunidade PetBook."
                : "Já tem uma conta? Entre e reconecte-se com a comunidade."}
            </p>
            <button
              className="btn-outline"
              onClick={() => trocar(isLogin ? "register" : "login")}
            >
              {isLogin ? "Criar conta" : "Entrar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
