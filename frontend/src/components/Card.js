import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);

    const isLiked = card.likes.some(item => item._id === currentUser._id);
    const isOwner = card.owner === currentUser._id;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card._id);
    }

    return (
        <li className="card">
            <img
                className="card__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <div className="card__info">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__button-heart">
                    <button
                        type="button"
                        className={`card__heart ${isLiked && 'card__heart_active'}`}
                        onClick={handleLikeClick}
                    />
                    <p className="card__heart-meter">{card.likes.length}</p>
                </div>
            </div>
            {isOwner &&
                <button
                    className="card__basket"
                    type="button"
                    onClick={handleDeleteClick}
                />}
        </li>
    )
}

export default Card
