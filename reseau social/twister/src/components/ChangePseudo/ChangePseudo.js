import React, { useEffect } from 'react';
import SideBar from '../MainPage/SideBar';
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import "./changepseudo.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function ChangePseudo(props) {
    const navigate = useNavigate();
    const user = props.user
    const handleBack = () => {
        navigate(-1)
    }
    
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
                                <h1 className='settings-titre'>Modifier votre nom d'utilisateur</h1>
                            </div>
                        </div>
                        <div className='username-change'>
                            <div className='conteneur_username'>
                                <div className='username1'>
                                    <label htmlFor="password1">Nouveau username</label>
                                </div>
                                <div className='username2'><label htmlFor="password2">Confirmez le nom d'utilisateur</label></div>
                            </div>
                            <div className='conteneur_pseudo'>
                                <div className='pseudo1'>
                                    <input type="text" id="password1" name="password1" />
                                </div>
                                <div className='pseudo2'><input type="text" id="password2" name="password2" /></div>
                            </div>


                        </div>
                        <button className='btn-confirm'>Confirmer</button>
                    </div>
                    <div className="right-pane">
                        <LeftSideBar user={user} />
                    </div>
                </section >
            </div >
        )
    }
}

export default ChangePseudo;