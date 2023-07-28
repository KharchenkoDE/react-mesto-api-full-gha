import React from "react";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar-edit" onClick={onEditAvatar}>
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Аватар"
                    />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button
                        type="button"
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    />
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                />
            </section>
            <section className="elements">
                <ul className="elements__group">
                    {cards.map((card) => (
                        <Card
                            onCardClick={onCardClick}
                            key={card._id}
                            card={card}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </section>
        </main>
    )
}

export default Main;
