import signError from '../images/signError.svg';
import signSuccess from '../images/signSuccess.svg';

function InfoTooltip({ isOpen, onClose, isSuccess }) {

    return (
        <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <img className="popup__infotooltip-img"
                    src={`${isSuccess ? signSuccess : signError}`}
                    alt="Информация об авторизации"
                />
                <h2 className="popup__infotooltip-title">
                    {isSuccess ? "Вы успешно зарегистрировались!" 
                    : "Что-то пошло не так! Попробуйте ещё раз."}
                </h2>
                <button type="button" className="popup__close" onClick={onClose} />
            </div>
        </div>
    )
}

export default InfoTooltip
