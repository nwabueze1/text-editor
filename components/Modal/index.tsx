import { ReactNode } from "react";

interface IModal {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}
export default function Modal({ children, open, onClose }: IModal) {
  return open ? (
    <div className="modal__container">
      <div className="modal">
        <header className="modal_header">
          <h4 className="modal__title">Embed</h4>
          <span>
            <i className="fa fa-close" onClick={onClose}></i>
          </span>
        </header>
        <div className="modal__body">{children}</div>
      </div>
      <div
        className={`backdrop ${open ? "active" : ""}`}
        onClick={onClose}
      ></div>
    </div>
  ) : null;
}
