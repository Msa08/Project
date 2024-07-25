import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import Header from '../Header';
import Commentaire from '../commentaire/Commentaire';
import SideBar from './SideBar';
import LeftSideBar from './LeftSideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function MainPage(props) {
    const navigate = useNavigate();
    const user = props.user

    // const test_connect = () => {
    //     axios.get('http://localhost:4000/user/logged')
    //         .then(response => {
    //             if (response.data.logged) {
    //                 setuser({
    //                     "logged": response.data.logged,
    //                     "nom": response.data.nom,
    //                     "prenom": response.data.prenom,
    //                     "pseudo": response.data.pseudo
    //                 })
    //             }
    //             else {
    //                 setuser({
    //                     "logged": false
    //                 })
    //             }
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }
    // useEffect(() => {
    //     test_connect()
    // }, [])
    if (user.logged) {
        return (
            <div className="main">
                <div className='SectionMain' style={{ overflow: 'auto' }}>
                    <section className='header'>
                        <Header user={user} />
                    </section>
                    <section className='corpsco'>
                        <div className="left-pane">
                            <SideBar user={user} />
                        </div>
                        <div className="main-pane">
                            <div className='pannel-settings'>
                                <div className='icone-back'>
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                </div>
                                <div className='titre_section'>
                                    <h1 className='settings-titre'>
                                        Pour vous</h1>
                                </div>
                            </div>
                            <Commentaire user={user} />
                        </div>
                        <div className="right-pane">
                            <LeftSideBar />
                        </div>
                    </section>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="main">
                <div className='SectionMain' style={{ overflow: 'auto' }}>
                    <section className='header'>
                        <Header user={user} />
                    </section>
                    <section className='corps'>
                        <div className="left-pane">
                        </div>
                        <div className="main-pane">
                            <Commentaire user={user} />
                        </div>
                        <div className="right-pane">
                            <LeftSideBar />
                        </div>
                    </section>
                    <section className='footmain'>
                        <div className="texte">
                            <h2 className="txt-foot">Vous voulez commenter ?</h2>
                        </div>
                        <div className="login" style={{ display: 'flex', alignItems: 'center' }}>
                            <button className='footmain-button' onClick={() => navigate('/connexion')}>Connectez-vous.</button>
                            <button className='footmain-button' onClick={() => navigate('/inscription')}>Inscrivez-vous</button>
                        </div>
                    </section>

                </div>
            </div>
        );
    }
}

export default MainPage;
