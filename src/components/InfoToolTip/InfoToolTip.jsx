import './InfoToolTip.css'
import failure from "./../../images/failure.svg";
import succsess from "./../../images/Union1.svg";


export default function InfoTooltip({
  isOpen,
  onClose,
  onMessage,
}) {
  const { message } = onMessage;
  const { isError } = onMessage

  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={() => onClose()}></button>
        <img
          src={isError ? failure : succsess}
          alt="Результат авторизации"
          className="popup__info-icon"
        />
        <p className="popup__paragraph">{message}</p>
      </div>
    </div>
  );
}
