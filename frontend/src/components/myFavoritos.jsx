import { createPortal } from "react-dom";
import "./style/myFavoritos.css";

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
<footer>
  <button className="cancel-button" onClick={onClose}>X</button>
</footer>
      </div>
    </div>,
    document.body // <-- Destino do teletransporte!
  );
}