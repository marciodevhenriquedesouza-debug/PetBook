import { createPortal } from "react-dom";
import "./style/myMessages.css";

export default function CreateMessagesModal({ isOpen, onClose, title }) {
  // Se estiver fechado, não desenha nada
  if (!isOpen) return null;

  // O createPortal "teletransporta" esse HTML para o document.body
  return createPortal(
    <div className="modalMessages-overlay" onClick={onClose}>
      <div className="modalMessages-content" onClick={(e) => e.stopPropagation()}>

        <header className="modalMessages-header">
          <h2>{title}</h2>
        </header>

        <div className="modalMessages-body">

        </div>
        <footer>
          <button className="cancel-button" onClick={onClose}>X</button>
        </footer>

      </div>
    </div>,
    document.body // <-- Destino do teletransporte!
  );
}