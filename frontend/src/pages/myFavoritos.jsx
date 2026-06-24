import { createPortal } from "react-dom";
import "./myFavoritos.css";

export default function CreateFavoritosModal({ isOpen, onClose, title }) {
  // Se estiver fechado, não desenha nada
  if (!isOpen) return null;

  // O createPortal "teletransporta" esse HTML para o document.body
  return createPortal(
    <div className="modalFavoritos-overlay" onClick={onClose}>
      <div className="modalFavoritos-content" onClick={(e) => e.stopPropagation()}>
        
        <header className="modalFavoritos-header">
          <h2>{title}</h2>
        </header>

        <div className="modalFavoritos-body">
          
        </div>

      </div>
    </div>,
    document.body // <-- Destino do teletransporte!
  );
}