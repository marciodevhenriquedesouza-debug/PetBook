import { createPortal } from "react-dom";
import "./perfilEdit.css";

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export default function CreateperfilEditModal({ isOpen, onClose, title }) {
  // Se estiver fechado, não desenha nada
  if (!isOpen) return null;

  // O createPortal "teletransporta" esse HTML para o document.body
  return createPortal(
    <div className="modalPerfil-overlay" onClick={onClose}>
      <div className="modalPerfil-content" onClick={(e) => e.stopPropagation()}>
        <header className="modalPerfil-header">
          <h2>{title}</h2>
        </header>

        <div className="modalPerfil-body">
          <div className="photoUser"></div>
          <div className="photo-edit">
            <svg {...iconProps}>
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
            </svg>
          </div>

          <div className="dados">
            <div>Nome: Ana Paula Soares</div>
            <div>Idade: 27 anos</div>
            <div>Email: anas27paula@gmail.com</div>
            <div className="pets">
              Pets: 2
              <div>
                <svg {...iconProps}>
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
          <button className="save-button">Salvar</button>
        </footer>
      </div>
    </div>,
    document.body, // <-- Destino do teletransporte!
  );
}
