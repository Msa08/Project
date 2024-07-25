import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import SideBar from '../MainPage/SideBar';
import './settings.css'
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import ColorSwitches from '../tools/ColorSwitches';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
//import MuiAlert from '@mui/material/Alert';


function Settings(props) {

    const user = props.user
    const [privee, setPrivate] = useState("");
    const [json, setJson] = useState({});
    const navigate = useNavigate();

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        console.log(user)
        if(!user.logged){
            navigate('/connexion')
        }
        
    }, [user])

    useEffect(() => {
        axios.get('http://localhost:4000/user/personnalsettings', { withCredentials: true })
            .then(response => {
                setPrivate(response.data.private);
            })
            .catch(error => {
                console.error(error)
            });
    }, [])

    const handlePrivee = () => {
        setJson(prevState => ({ ...prevState, "private": !privee }))
        console.log(json)
        setPrivate(!privee);
    }


    // const Alert = React.forwardRef(function Alert(props, ref) {
    //     return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    // });


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };



    const handleSave = (event) => {
        event.preventDefault();
        console.log("Modifications enregistrees")
        axios.put('http://localhost:4000/user/settings', json, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    console.log("changement enregistré");
                }
                localStorage.setItem("modificationReussie", true);
                localStorage.removeItem("modificationReussie");
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handledeleteAccount = async() =>{
        await axios.post('http://localhost:4000/user/deleteaccount',{},{withCredentials:true})
        .then(res=>{
            console.log("user supp")
            handleCloseModal();
            props.test_connect();
        })
        navigate('/main');
    }

    return (
        <div>
            <div className='SectionMain' style={{ overflow: 'auto' }}>
                <section className='header'>
                    <Header user={user} />
                </section>
                <section className='corpschild'>
                    <div className="left-pane">
                        <SideBar user={user} />
                    </div>
                    <div className="main-pane">
                        <section className="main-pane-settings">
                            <div className='pannel-settings'>
                                <div className='icone-back'>
                                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                                </div>
                                <div className='titre_section'>
                                    <h1 className='settings-titre'>Settings</h1>
                                </div>
                            </div>
                            <div className='pannel-liste-settings'>
                                <div className='privacy-settings1'>
                                    <div className='settings-description'>
                                        Compte Privé
                                    </div>
                                    <div className='switches'>
                                        <ColorSwitches change={privee} func={handlePrivee} />
                                    </div>
                                </div>

                                <div className='message-settings' style={{ cursor: 'pointer' }} >
                                    <div className='settings-description' style={{ cursor: 'pointer' }} onClick={() => navigate('/setpassword/' + user.pseudo)}>
                                        Modifier mot de passe
                                    </div>
                                </div>
                                <div className='message-settings' style={{ cursor: 'pointer' }}>
                                    <div className='settings-description' style={{ cursor: 'pointer' }} onClick={() => navigate('/blocked/' + user.pseudo)}>
                                        Utilisateurs Bloqués
                                    </div>
                                </div>
                                <div className='message-settings' style={{ cursor: 'pointer' }} >
                                    <div className='settings-description' style={{ cursor: 'pointer' }} onClick={() => navigate('/information/' + user.pseudo)}>
                                        Modifier informations personnelles
                                    </div>
                                </div>
                                <div className='message-settings' style={{ cursor: 'pointer' }}  >
                                    <div className='settings-description' style={{ cursor: 'pointer' }} onClick={handleOpenModal}  >
                                        Supprimer le compte
                                    </div>
                                    {
                                        <Modal
                                            open={openModal}
                                            onClose={handleCloseModal}
                                            aria-labelledby="modal-modal-title"
                                            aria-describedby="modal-modal-description"
                                        >
                                            <Box sx={style}>

                                                <h2 id="parent-modal-title">Supprimer votre compte? </h2>
                                                <p id="parent-modal-description">
                                                    Etes vous sûr de vouloir supprimé votre compte Twister ? Une fois supprimé, il vous sera impossible de le récupérer.
                                                </p>
                                                <div className='delete-twist-pannel'>
                                                    <button onClick={handledeleteAccount} >Oui, supprimer le compte</button>
                                                    <button onClick={handleCloseModal}>Annuler</button>
                                                </div>
                                            </Box>
                                        </Modal>
                                    }
                                </div>
                                <div className='message-settings1' style={{ cursor: 'pointer' }} onClick={() => navigate('/statistiques')} >
                                    <div className='settings-description' style={{ cursor: 'pointer' }} onClick={() => navigate('/statistiques')} >
                                        Statistiques Utilisateur
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSave}>Enregistrer</button>

                        </section>
                    </div>
                    <div className="right-pane">
                        <LeftSideBar />
                    </div>
                </section >
            </div >
        </div>
    )

}

export default Settings;