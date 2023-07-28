import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('')
        }
    }, [isOpen])

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name={'add'}
            title={'Новое место'}
            onClose={onClose}
            isOpen={isOpen}
            submitButtonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input
                name="add-name"
                id="add-input"
                className="popup__input popup__input_add_name"
                type="text" 
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <p className="popup__input-error add-input-error"></p>
            <input
                name="add-image"
                id="image-input"
                className="popup__input popup__input_add_image"
                type="url"
                placeholder="Ссылка на картинку"
                required
                value={link}
                onChange={(event) => setLink(event.target.value)}
            />
            <p className="popup__input-error image-input-error"></p>
        </PopupWithForm>
    )
}

export default AddPlacePopup
