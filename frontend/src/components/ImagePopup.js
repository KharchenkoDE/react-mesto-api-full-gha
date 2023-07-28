function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_image">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                />
                <img className="popup__image"
                    src={card?.link}
                    alt={card?.name}
                />
                <p className="popup__caption">{card ? card.name : ''}</p>
            </div>
        </div>
    );
}

export default ImagePopup;
