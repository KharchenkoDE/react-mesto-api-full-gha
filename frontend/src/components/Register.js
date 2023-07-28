import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Register({ isLoggedIn, onRegister }) {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formData;
        if(!email || !password) {
            return;
        }
        onRegister(email, password);
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={handleSubmit} className="auth auth__form" name="register">
            <h2 className="auth__title">Регистрация</h2>
            <input
                className="auth__input"
                id="reg-email"
                name="email"
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <input
                className="auth__input"
                id="reg-password"
                name="password"
                type="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <button type="submit" className="auth__button">
                Зарегистрироваться
            </button>

            <div>
                <Link to="/sign-in" className="auth__back-link">
                    Уже зарегистрированы? Войти
                </Link>
            </div>
        </form>
    );
}

export default Register;