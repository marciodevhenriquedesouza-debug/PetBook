import { createPortal } from "react-dom";
import "./style/CreatePostModal.css";

export default function CreatePostModal({ isOpen, onClose, title }) {
  // Se estiver fechado, não desenha nada
  if (!isOpen) return null;

  // O createPortal "teletransporta" esse HTML para o document.body
  return createPortal(
    <div className="modal2-overlay" onClick={onClose}>
      <div className="modal2-content" onClick={(e) => e.stopPropagation()}>
        
        <header className="modal-header">
          <h2>{title}</h2>
        </header>

        <div className="modal-body">
          <textarea 
            placeholder="O que você quer compartilhar?"
            autoFocus
          ></textarea>
        </div>

        <footer className="modal-footer">
          <button className="addMidia-button">Mídia</button>
          <button className="addLocation-button">Localização</button>
          <button className="cancelButton" onClick={onClose}>Cancelar</button>
          <button className="publish-button">Publicar</button>
        </footer>

      </div>
    </div>,
    document.body // <-- Destino do teletransporte!
  );
}