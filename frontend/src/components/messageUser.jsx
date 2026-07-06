import { createPortal } from "react-dom";
import "./style/messageUser.css";

export default function CreateMessageModal({ isOpen, onClose, title }) {
  // Se estiver fechado, não desenha nada
  if (!isOpen) return null;

  // O createPortal "teletransporta" esse HTML para o document.body
  return createPortal(
    <div className="modalMessage-overlay" onClick={onClose}>
      <div className="modalMessage-content" onClick={(e) => e.stopPropagation()}>
        
        <header className="modalMessage-header">
          <h2>{title}</h2>
        </header>

        <div className="modalMessage-body">
          <textarea 
            placeholder="Digite sua mensagem aqui ..."
            autoFocus
          ></textarea>
        </div>

        <footer className="modalMessage-footer">
          <button className="addMidia-button">Seguir</button>
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
          <button className="publish-button">Enviar</button>
        </footer>

      </div>
    </div>,
    document.body // <-- Destino do teletransporte!
  );
}