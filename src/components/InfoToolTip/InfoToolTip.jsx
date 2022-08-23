import './InfoToolTip.css'
import failure from "./../../images/failure.svg";

export default function InfoTooltip({
  isOpen,
  onClose,
  onMessage,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={() => onClose()}></button>
        <img
          src={failure}
          alt="Результат авторизации"
          className="popup__info-icon"
        />
        <p className="popup__paragraph">{onMessage}</p>
      </div>
    </div>
  );
}
