import { createPortal } from "react-dom";
import "./style/myNotification.css";

export default function CreateNotificationModal({ isOpen, onClose, title }) {
  // Se estiver fechado, não desenha nada
  if (!isOpen) return null;

  // O createPortal "teletransporta" esse HTML para o document.body
  return createPortal(
    <div className="modalNotification-overlay" onClick={onClose}>
      <div className="modalNotification-content" onClick={(e) => e.stopPropagation()}>

        <header className="modalNotification-header">
          <h2>{title}</h2>
        </header>

        <div className="modalNotification-body">

        </div>
        <footer>
          <button className="cancel-button" onClick={onClose}>X</button>
        </footer>

      </div>
    </div>,
    document.body // <-- Destino do teletransporte!
  );
}