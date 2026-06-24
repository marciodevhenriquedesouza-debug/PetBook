import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import "./menuSusp.css";
import CreateperfilEditModal from "./perfilEdit";


export default function CreateMenuModal({ isOpen, onClose }) {
  // Se estiver fechado, não desenha nada
  const [modalAberto, setModalAberto] = useState(null);
  const navigate = useNavigate();

  if (!isOpen) return null;
    function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  }
  
  // O createPortal "teletransporta" esse HTML para o document.body
  return createPortal(
    <div className="modalMenu-overlay" onClick={onClose}>
      <div className="modalMenu-content" onClick={(e) => e.stopPropagation()}>
        <div className="modalMenu-body">
          <button onClick= {() => setModalAberto("perfil")} className="perfil">Perfil</button>
          <button onClick={handleLogout} className="sair">Sair</button>

                  <CreateperfilEditModal
                    isOpen={modalAberto === "perfil"}
                    onClose={() => setModalAberto(null)}
                    title="Meu Perfil"
                  />
          
        </div>
      </div>
    </div>,
    document.body, // <-- Destino do teletransporte!
  );
}
