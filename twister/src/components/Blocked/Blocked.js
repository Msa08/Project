import React, { useState, useEffect } from 'react';
import SideBar from '../MainPage/SideBar';
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./blocked.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons'

function Block(props) {
    const { user_blocked } = props
    const [selectedPp, setselectedPp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");

    const handleDebloque = () => {
        axios.post('http://localhost:4000/user/unblock/' + user_blocked, {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    props.func();
                }
            })
    }

    useEffect(()=>{
        axios.get('http://localhost:4000/user/pp/' + user_blocked, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
                    .then(res => {
                        if (res.data) {
                                const url = URL.createObjectURL(res.data);
                                setselectedPp(url)

                        }
                    })
    },[])

    return (
        <div className='request-pannel'>
            <div className='pdp-request'>
                <img src={selectedPp} className="pdp-request_" alt="pp-back" />
            </div>
            <div className='identifier-request'>
                {user_blocked}
            </div>
            <div className='btn-request'>
                <button className='deniedBtn' onClick={handleDebloque}>Débloquer <FontAwesomeIcon icon={faXmark} /></button>

            </div>
        </div >
    )

}

function Blocked(props) {
    const navigate = useNavigate();
    const user = props.user
    const [liste_blocked, setlisteblocked] = useState([]);
    const handleLoadBlocked = () => {
        axios.get("http://localhost:4000/user/liste_block", { withCredentials: true })
            .then(response => {
                let tab = []
                for (var i = 0; i < response.data.length; i++) {
                    tab.push(response.data[i]);
                }
                setlisteblocked(tab);
            })
    }
    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        handleLoadBlocked();
    }, [])

    useEffect(() => {
        console.log(user)
        if(!user.logged){
            navigate('/connexion')
        }
        
    }, [user])
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
                    <div className='request-settings'>
                        <div className='icone-back'>
                            <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                        </div>
                        <div className='titre_section'>
                            <h1 className='settings-titre'>Utilisateurs bloqués</h1>
                        </div>
                    </div>
                    <div className='liste-request'>
                        {liste_blocked.length > 0 ? (
                            liste_blocked.map((request, index) =>
                                <Block key={index} {...request} func={handleLoadBlocked} />
                            )
                        ) : (
                            <h1 className="title-request">Aucun utilisateur bloqué.</h1>
                        )}
                    </div>
                </div>
                <div className="right-pane">
                    <LeftSideBar user={user} />
                </div>
            </section >
        </div >
    )
}

export default Blocked;