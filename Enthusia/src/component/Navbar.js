import React, { useState } from 'react';
import './css/Nav.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const Navbar = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();

        // Validate email format
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setMessage('Please enter a valid email address');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/subscribe', { email });
            setMessage(response.data.message);
            setEmail('');  // Clear the input field after successful subscription
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error subscribing, please try again');
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src="favicon.png" alt="Symbiosis" />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/About">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Sponsor">Sponsor</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Contact">Contact</Link>
                            </li>
                        </ul>
                        <form className="d-flex ms-3" onSubmit={handleSubscribe} role="search">
                            <input
                                type="email"
                                className="input"
                                id="Email"
                                name="Email"
                                placeholder="example@gmail.com"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input className="button--submit" value="Subscribe" type="submit" />
                        </form>
                        {message && <div className="alert alert-info mt-3">{message}</div>}
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
