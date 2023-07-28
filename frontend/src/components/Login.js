import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Login({ isLoggedIn, onLogin }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChange(evt) {
        const { name, value } = evt.target;

        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(!email || !password) {
            return;
        }
        onLogin(email, password);
    }

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={handleSubmit} className="auth"> 
            <h2 className="auth__title">Вход</h2>
            <input className="auth__input"
                id="login-email"
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleChange}
                required
            />

            <input
                className="auth__input"
                id="login-password"
                name="password"
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={handleChange}
                required
            />
            <button type="submit" className="auth__button">Войти</button>

        </form>
    );
}

export default Login
