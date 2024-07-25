import React, { useState, useEffect } from 'react';
import SideBar from '../MainPage/SideBar';
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import "./changepwd.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function ChangePwd(props) {
    const navigate = useNavigate();
    const [name, setname] = useState("");
    const [prenom, setprenom] = useState("");
    const [pseudo, setpseudo] = useState("");
    const [date_n, setDate] = useState("");
    const [email, setmail] = useState("");
    const [ageMsg, setAgeMsg] = useState("")
    const [mailMsg, setMailMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("");
    const [pseudoMsg, setpseudoMsg] = useState("");
    const user = props.user;

    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        setname(user.nom);
        setprenom(user.prenom);
        setpseudo(user.pseudo);
        setDate(user.date_n);
        setmail(user.mail);
    }, [user]);

    useEffect(() => {
        const cookies = document.cookie.split(';');
        let cookieFound = false;

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('token=')) {
                cookieFound = true;
                break;
            }
        }
        if(!cookieFound){
            navigate('/connexion')
        }
    }, [])

    const submitChange = async (e) => {
        e.preventDefault();
        if (email && !email.includes('@')) {
            setSuccessMsg("");
            setAgeMsg("");
            setMailMsg("Le format de l'adresse mail n'est pas respecté");
            return;
        }
        else{
            setMailMsg("");
            setSuccessMsg("");
            setAgeMsg("");
            setpseudoMsg("");
        }
        let today = new Date();
        let birthDate = new Date(date_n);
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (birthDate > today) {
            setSuccessMsg("");
            setAgeMsg("La date de naissance ne peut pas être une date future");
            setDate("");
            setpseudoMsg("");
            return;
        }
        const isUnder16 = age < 16;
        if (isUnder16) {
            console.log(ageMsg);
            setSuccessMsg("");
            setAgeMsg("Vous devez avoir au moins 16 ans pour utiliser ce service.");
            setDate("");
            setpseudoMsg("");
            return;
        } else {
            setAgeMsg("");
            setDate(birthDate.toISOString().substring(0, 10));
            await axios.post('http://localhost:4000/user/setinformation', {
                nom: name,
                prenom: prenom,
                new_pseudo: pseudo,
                date: date_n,
                email: email
            }, { withCredentials: true })
                .then(res => {
                    setSuccessMsg("Les modifications ont été enregistrées avec succès !");
                })
                .catch(error=>{
                    if(error.response.status===401){
                        setpseudoMsg("Pseudo non disponible.")
                    }
                })
            props.connect();
        }
    };
    if (user.logged) {
        return (
            <div className='SectionMain' style={{ overflow: 'auto' }}>
                <section className='header'>
                    <Header user={user} />
                </section>
                <section className='corpschild'>
                    <div className="left-pane">
                        <SideBar user={user} />
                    </div>
                    <div className="main-pane">
                        <div className='saved-settings'>
                            <div className='icone-back'>
                                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                            </div>
                            <div className='titre_section'>
                                <h1 className='settings-titre'>Modifier les informations personnelles</h1>
                            </div>
                        </div>
                        <div className='modification-info'>
                            <div className='modif-nom-prenom'>
                                <div className='modif-nom'>
                                    <div className="inputs">
                                        <input type="nom" id="nom" required value={name} onChange={(e) => setname(e.target.value)} />
                                        <label htmlFor="">Nom</label>
                                    </div>
                                </div>
                                <div className="inputs">
                                    <input type="prenom" id="prenom" required value={prenom} onChange={(e) => setprenom(e.target.value)} />
                                    <label htmlFor="">Prenom</label>
                                </div>
                            </div>
                            <div className='modif-mail-birth'>
                                <div className='modif-mail'>
                                    <div className="inputs">
                                        <input type="mail" id="mail" required value={email} onChange={(e) => setmail(e.target.value)} />
                                        <label htmlFor="">Email</label>
                                    </div>
                                </div>
                                <div className="inputs">
                                    <input type="date" id="date" value={date_n} onChange={(e) => setDate(e.target.value)} />
                                    <label htmlFor="">Date de naissance</label>
                                </div>
                            </div>
                            <div className='modif-mail-birth'>
                                <div className="inputs">
                                    <input type="pseudo" id="pseudo" required value={pseudo} onChange={(e) => setpseudo(e.target.value)} />
                                    <label htmlFor=""> Pseudo</label>
                                </div>
                            </div>
                        </div>
                        {successMsg && (
                            <div className="success-msg">{successMsg}</div>
                        )}
                        {ageMsg && (
                            <div className="age-msg">{ageMsg}</div>
                        )}
                        {mailMsg && (
                            <div className="age-msg">{mailMsg}</div>
                        )}
                        {pseudoMsg && (
                            <div className="age-msg">{pseudoMsg}</div>
                        )}
                        <button className='btn-confirm' onClick={(e) => submitChange(e)}>Confirmer</button>
                    </div>
                    <div className="right-pane">
                        <LeftSideBar user={user} />
                    </div>
                </section >
            </div >
        )
    }
}

export default ChangePwd;