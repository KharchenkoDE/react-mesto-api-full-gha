import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onClose, isOpen, onUpdateAvatar }) {
    const inpurRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateAvatar({
            avatar: inpurRef.current.value
        });
    }

    useEffect(()=>{
        inpurRef.current.value = ''
    }, [isOpen]) 

    return (
        <PopupWithForm
            name={'avatar'}
            title={'Обновить аватар'}
            onClose={onClose}
            isOpen={isOpen}
            submitButtonText={'Сохранить'}
            onSubmit={handleSubmit}
        >
            <input
                ref={inpurRef}
                name="userAvatar"
                id="avatar-input"
                className="popup__input popup__input_avatar_name"
                type="url"
                placeholder="Ссылка на изображение"
                required
            />
            <p className="popup__input-error avatar-input-error"></p>
        </PopupWithForm>
    )
}

export default EditAvatarPopup
