import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import ImagePopup from '../components/ImagePopup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup';
import { api } from "../utils/api.js";
import * as auth from '../utils/authApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute'
import InfoTooltip from './InfoTooltip'

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({
        name: '',
        about: '',
        avatar: '',
    });
    const [cards, setCards] = useState([]);
    const [hederEmail, setHeaderEmail] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [isTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const navigate = useNavigate();

    function getStartAppData() {
        api.getAppData()
            .then(([userData, initialCards]) => {
                setCurrentUser(userData.data);
                setCards(initialCards);
            })
            .catch((err) => console.log(err));
    };

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(null);
        setIsTooltipPopupOpen(false);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLike(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => console.log(err))
    }

    function handleCardDelete(id) {
        api.deleteCard(id)
            .then(() => setCards((state) => state.filter((item) => item._id !== id)))
            .catch((err) => console.log(err))
    }

    function handleUpdateUser(userData) {
        api.setUserInfo(userData)
            .then(response => {
                setCurrentUser(response);
                closeAllPopups();
            })
            .catch((err) => console.log(err))
    }

    function handleUpdateAvatar(avatar) {
        api.setAvatar(avatar)
            .then(response => {
                setCurrentUser((prevState) => {
                    return {
                        ...prevState,
                        avatar: response.avatar
                    }
                })
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleAddPlaceSubmit(newPlace) {
        api.postNewCard(newPlace)
            .then(newCard => {
                setCards([newCard, ...cards])
                closeAllPopups()
            })
            .catch((err) => console.log(err))
    }

    function handleLoginUser(email, password) {
        auth.loginUser(email, password)
            .then((data) => {
                if (data.token) {
                    setHeaderEmail(email);
                    setLoggedIn(true);
                    localStorage.setItem("jwt", data.token);
                    getStartAppData();
                    navigate('/', { replace: true });
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsTooltipPopupOpen(true);
                console.log(err);
            });
    }

    function handleRegUser(email, password) {
        auth.regUser(email, password)
            .then((data) => {
                if (data) {
                    setIsSuccess(true);
                    setIsTooltipPopupOpen(true);
                    navigate('/login', { replace: true });
                }
            })
            .catch((err) => {
                setIsSuccess(false);
                setIsTooltipPopupOpen(true);
                console.log(err);
            })
    }


    function handleTokenCheck() {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            auth.checkToken(jwt)
                .then((res) => {
                    if (res) {
                        setHeaderEmail(res.data.email);
                        setLoggedIn(true);
                        navigate("/", { replace: true });
                        getStartAppData();
                    }
                })
                .catch((err) => console.log(err));
        }
    }

    useEffect(() => {
        handleTokenCheck();
    }, [])

    function handleSignOut() {
        localStorage.removeItem("jwt");
        setHeaderEmail("");
        setCurrentUser({
            name: '',
            about: '',
            avatar: '',
        })
        setLoggedIn(false);
        navigate('/sign-in', { replace: true });
    }

    return (

        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">

                <Header onSignOut={handleSignOut} headerEmail={hederEmail} loggedIn={loggedIn} />

                <Routes>

                    <Route path="/*" element={<Navigate to="/" />} />

                    <Route path="/" element={

                        <ProtectedRouteElement
                            element={Main}
                            cards={cards}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardLike={handleCardLike}
                            onCardDelete={handleCardDelete}
                            loggedIn={loggedIn}
                        />
                    }
                    />

                    <Route path="/sign-up" element={<Register onRegister={handleRegUser} />} />

                    <Route path="/sign-in" element={<Login onLogin={handleLoginUser} />} />

                </Routes>

                <Footer />

                <InfoTooltip
                    isOpen={isTooltipPopupOpen}
                    onClose={closeAllPopups}
                    isSuccess={isSuccess}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <PopupWithForm
                    name={'delete'}
                    title={'Вы уверены?'}
                    onClose={closeAllPopups}
                    isOpen={false} submitButtonText={'Да'}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />

            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;
