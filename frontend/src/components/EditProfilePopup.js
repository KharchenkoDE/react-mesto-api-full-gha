import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about)
        }
    }, [currentUser, isOpen])

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name={'edit'}
            title={'Редактировать профиль'}
            onClose={onClose}
            isOpen={isOpen}
            submitButtonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input
                name="userName"
                id="name-input"
                className="popup__input popup__input_profile_name"
                type="text"
                placeholder="Ваше имя"
                minLength="2"
                maxLength="40"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <p className="popup__input-error name-input-error"></p>
            <input
                name="userData"
                id="profession-input"
                className="popup__input popup__input_profile_profession"
                type="text" placeholder="Ваша профессия"
                minLength="2"
                maxLength="200"
                required
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />
            <p className="popup__input-error profession-input-error"></p>
        </PopupWithForm>
    )
}

export default EditProfilePopup
