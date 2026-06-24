import { createPortal } from "react-dom";
import "./CreateStoryModal.css";

export default function CreateStoryModal({ isOpen, onClose, title }) {
  // Se estiver fechado, não desenha nada
  if (!isOpen) return null;

  // O createPortal "teletransporta" esse HTML para o document.body
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <header className="modal-header">
          <h2>{title}</h2>
        </header>

        <div className="modal-body">Preview do seu Story</div>

        <footer className="modal-footer">
          <button className="addMidia-button">Mídia</button>
          <button className="addLocation-button">Localização</button>
          <button className="cancel-button" onClick={onClose}>Cancelar</button>
          <button className="publish-button">Publicar</button>
        </footer>

      </div>
    </div>,
    document.body // <-- Destino do teletransporte!
  );
}