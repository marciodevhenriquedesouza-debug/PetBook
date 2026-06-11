import { useState } from "react"
import "./Auth.css"


export default function Auth() {
  const [modo, setModo] = useState("login")
  const [animando, setAnimando] = useState(false)

  function trocar(novoModo) {
    if (novoModo === modo || animando) return
    setAnimando(true)
    setTimeout(() => {
      setModo(novoModo)
      setAnimando(false)
    }, 4000)
  }

  const isLogin = modo === "login"

  return (
    <div className="auth-page">
      <div className={`auth-card ${isLogin ? "modo-login" : "modo-register"}`}>

        {/* PAINEL FORMULÁRIO */}
        <div className="painel-form">
          <div className="painel-form-inner">
            <h1>{isLogin ? "Login" : "Cadastro"}</h1>

            {!isLogin && (
              <div className="campo">
                <input type="text" placeholder="Nome completo" />
                
              </div>
            )}

            <div className="campo">
              <input type="email" placeholder="E-mail" />
              
            </div>

            {!isLogin && (
              <div className="campo">
                <input type="number" placeholder="Idade" />
                
              </div>
            )}

            <div className="campo">
              <input type="password" placeholder="Senha" />
              
            </div>

            <button className="btn-main">
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
        <div className={`painel-color ${animando ? "animando" : ""}`}>
          <div className="painel-color-inner">
            <div className="paw-icon">
              <img src="/logo.png" alt="PetBook logo"  />
            </div>
            <h2>{isLogin ? "Olá,\nBem-vindo!" : "Bem-vindo\nde volta!"}</h2>
            <p>
              {isLogin
                ? "Não tem uma conta ainda? Cadastre-se e junte-se à comunidade PetBook."
                : "Já tem uma conta? Entre e reconecte-se com a comunidade."}
            </p>
            <button className="btn-outline" onClick={() => trocar(isLogin ? "register" : "login")}>
              {isLogin ? "Criar conta" : "Entrar"}
            </button> 
          </div>
        </div>

      </div>
    </div>
  )
}
