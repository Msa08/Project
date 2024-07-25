import React, { useState } from 'react';
import './connexion.css'
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Connexion(props) {
    const navigate = useNavigate();
    const [BtnColor1, setBtnColor1] = useState('rgb(55, 110, 162)');
    const handlerColor1 = (event) => setBtnColor1('rgb(85, 140, 162)')
    const handlerColorReset1 = (event) => setBtnColor1('rgb(55, 110, 162)')
    const [pseudo, setpseudo] = useState("")
    const [password, setpass] = useState("")
    const [error, setError] = useState("");
    const user = { "logged": false }

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:4000/user/login', {
            "pseudo": pseudo,
            "password": password
        }, { withCredentials: true })
            .then(response => {
                    props.test_connect()
                    navigate("/main")

            })
            .catch(error => {
                console.error(error);
                setError("Le pseudo ou le mot de passe est incorrect");
            });

    }

    return (
        <div className="Connexion">
            <head>
                <meta charset="utf-8" />
                <title>Ouvrir une session</title>
            </head>
            <header>
                <Header user={user} />
            </header>
            <body className="bodyconne">
                <section className="section_connexion">
                    <div className="formulaire">
                        <div className="champs">
                            <form onSubmit={handleSubmit}>
                                <h2>Connexion</h2>
                                <div className={error ? "input-error" : "inputs"}>
                                    <input
                                        type="input"
                                        id="mail"
                                        value={pseudo}
                                        required
                                        onChange={(e) => setpseudo(e.target.value)}
                                    />

                                    <label htmlFor="">Pseudo</label>
                                </div>
                                <div className={error ? "input-error" : "inputs"}>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setpass(e.target.value)}
                                    />
                                    <label htmlFor="">Mot de passe</label>
                                </div>
                                <button
                                    style={{ backgroundColor: BtnColor1 }}
                                    type="submit"
                                    onMouseEnter={handlerColor1}
                                    onMouseLeave={handlerColorReset1}
                                >
                                    Se Connecter
                                </button>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                                <div className="register">
                                    <p>
                                        Si vous n'avez pas de compte inscrivez vous <a href="/inscription">Inscription</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
                <footer className="footcon">
                    <div className="gauche">
                        <span>Copyright © 2023 M&M Company Twister Sorbonne Université</span>
                    </div>
                    <div class="milieu">
                        <span> Twister </span>
                    </div>
                    <div class="droite">
                        <span> Sorbonne Université </span>
                    </div>
                </footer>
            </body>
        </div>
    )
}


export default Connexion;