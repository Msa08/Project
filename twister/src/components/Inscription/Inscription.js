import React, { useState } from 'react';
import './inscription.css'
import Header from '../Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Inscription(props) {
    const navigate = useNavigate();
    const [BtnColor1, setBtnColor1] = useState('rgb(55, 110, 162)');
    const handlerColor1 = (event) => setBtnColor1('rgb(85, 140, 162)')
    const handlerColorReset1 = (event) => setBtnColor1('rgb(55, 110, 162)')
    const user = { "logged": false }
    const [name, setname] = useState("")
    const [prenom, setprenom] = useState("")
    const [pseudo, setpseudo] = useState("")
    const [date_n, setDate] = useState("")
    const [email, setmail] = useState("")
    const [password1, setpass1] = useState("")
    const [password2, setpass2] = useState("")
    const [error, setError] = useState('');
    const [ageMsg, setAgeMsg] = useState("")
    const [mailMsg, setMailMsg] = useState("");
    const [PseudoMsg,setPseudoMsg] = useState("");
    const [passwordMsg,setpasswordMsg] = useState("");

    const HandleSubmit = (event) => {
        event.preventDefault();
        if (!name || !prenom || !pseudo || !date_n || !password1 || !password2 || !email) {
            setError('Remplissez tous les champs\n');
            setMailMsg('');
            setPseudoMsg('');
            setpasswordMsg('');
            setAgeMsg('')
            return;
        }
        if (email && !email.includes('@')) {
            setMailMsg("Format mail incorrecte\n")
            setError('');
            setPseudoMsg('');
            setpasswordMsg('');
            setAgeMsg('')
            return;
        }
        if (password1 !== password2) {
            setpasswordMsg("Les mot de passe ne sont pas identiques")
            setError('');
            setMailMsg('');
            setPseudoMsg('');
            setAgeMsg('')
            return;
        }
        let today = new Date();
        let birthDate = new Date(date_n);
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (birthDate > today) {
            setAgeMsg("Date incohérente")
            setError('');
            setMailMsg('');
            setPseudoMsg('');
            setpasswordMsg('');
            return;
        }
        const isUnder16 = age < 16;
        if (isUnder16) {
            console.log(ageMsg);
            setError("")
            setMailMsg('');
            setPseudoMsg('');
            setpasswordMsg('');
            setAgeMsg('Age minimum : 16 ans')
            return;
        } else {
            setError('');
            setAgeMsg('');
            setMailMsg('');
            setPseudoMsg('');
            setpasswordMsg('');
            axios.post('http://localhost:4000/user/create_user', {
                "nom": name,
                "prenom": prenom,
                "pseudo": pseudo,
                "date_n": date_n,
                "email": email,
                "password": password1,
                "nb_follow": 0,
                "nb_followers": 0
            }, { withCredentials: true })
                .then(response => {
                    props.test_connect();
                    navigate("/main");
                })
                .catch(error => {
                    setPseudoMsg("Pseudo déjà utilisé")
                    setError('');
                    setMailMsg('');
                    setpasswordMsg('');
                    setAgeMsg('');
                });
        }
    };

    // navigate("/profil")

    return (
        <div className="Inscription">
            <header>
                <Header user={user} />
            </header>
            <body className="bodyinsc">
                <section className="section_inscription">
                    <div className="formulaire_inscription">
                        <div className="champs">
                            <form onSubmit={HandleSubmit}>
                                <h2>Inscription</h2>
                                <div className={error ? "input-error" : "inputs"}>
                                    <input type="nom" id="nom" value={name} onChange={(e) => setname(e.target.value)} required />
                                    <label htmlFor="">Nom</label>
                                </div>
                                <div className={error ? "input-error" : "inputs"}>
                                    <input type="prenom" id="prenom" value={prenom} onChange={(e) => setprenom(e.target.value)} required />
                                    <label htmlFor="">Prenom</label>
                                </div>
                                <div className={error || PseudoMsg ? "input-error" : "inputs"}>
                                    <input type="pseudo" id="pseudo" value={pseudo} onChange={(e) => setpseudo(e.target.value)} required />
                                    <label htmlFor="">Pseudo</label>
                                </div>
                                <div className={error || ageMsg ? "input-error" : "inputs"}>
                                    <input type="date" id="date" value={date_n} onChange={(e) => setDate(e.target.value)} />
                                    <label htmlFor="">Date de naissance</label>
                                </div>
                                <div className={error || mailMsg ? "input-error" : "inputs"}>
                                    <input type="mail" id="mail" value={email} onChange={(e) => setmail(e.target.value)} required />
                                    <label htmlFor="">Email</label>
                                </div>
                                <div className={error || passwordMsg ? "input-error" : "inputs"}>
                                    <input type="password" id="pass1" value={password1} onChange={(e) => setpass1(e.target.value)} required />
                                    <label htmlFor="">Mot de passe</label>
                                </div>
                                <div className={error || passwordMsg ? "input-error" : "inputs"}>
                                    <input type="password" id="pass2" value={password2} onChange={(e) => setpass2(e.target.value)} required />
                                    <label htmlFor="">Confirmer mot de passe</label>
                                </div>
                                {PseudoMsg && <div className='age-msg' style={{ color: "red" }}>{PseudoMsg}</div>}
                                { ageMsg&& <div className='age-msg' style={{ color: "red" }}>{ageMsg}</div>}
                                {error && <div className='age-msg' style={{ color: "red" }}>{error}</div>}
                                {passwordMsg && <div className='age-msg' style={{ color: "red" }}>{passwordMsg}</div>}
                                {mailMsg && <div className='age-msg' style={{ color: "red" }}>{mailMsg}</div>}
                                <button className="button_inscription" style={{ backgroundColor: BtnColor1 }} onMouseEnter={handlerColor1} onMouseLeave={handlerColorReset1} onClick={HandleSubmit}>S'inscrire</button>
                            </form>
                        </div>
                    </div>
                </section >
            </body >
            <footer className='footinsc'>
                <div className="gauche">
                    <span>Copyright © 2023 M&M Company Twister Sorbonne Université</span>
                </div>
                <div className="milieu">
                    <span> Twister </span>
                </div>
                <div className="droite">
                    <span> Sorbonne Université </span>
                </div>
            </footer>
        </div >
    )
}

export default Inscription;