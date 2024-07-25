import React, { useState, useEffect } from 'react';
import SideBar from '../MainPage/SideBar';
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Request.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

function Request(props) {
    const navigate = useNavigate();
    const { user_asking } = props
    const [state, setstate] = useState(null)
    const [pp,setpp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745")

    const handleAccept = () => {
        axios.post('http://localhost:4000/user/accept_request/' + user_asking, {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setstate(true)
                }
            })
    }

    const handleRefuse = () => {
        axios.post('http://localhost:4000/user/refuse_request/' + user_asking, {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setstate(false)
                }
            })
    }

    useEffect(()=>{
        axios.get('http://localhost:4000/user/pp/' + user_asking, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
                        .then(res => {
                            if (res.data) {
                                const url = URL.createObjectURL(res.data);
                                setpp(url)
                            }
                        })
    },[])

    return (
        <div className='request-pannel'>
            <div className='pdp-request' onClick={() => navigate('/profil/' + user_asking)}>
                <img src={pp} className="pdp-request_" alt="pp-back" />
            </div>
            <div className='identifier-request'>
                {user_asking}
            </div>
            <div className='btn-request'>
                {state === null && (<button className='acceptBtn' onClick={handleAccept}>Accepter <FontAwesomeIcon icon={faCheck} /></button>)}
                {state === null && (<button className='deniedBtn' onClick={handleRefuse}>Refuser <FontAwesomeIcon icon={faXmark} /></button>)}
                {state === true && (<button className='acceptBtn'>Accepté !</button>)}
                {state === false && (<button className='deniedBtn'>Refusé</button>)}

            </div>
        </div >
    )

}

function FollowRequest(props) {
    const navigate = useNavigate();
    const user = props.user
    const [liste_request, setlisterequest] = useState([]);
    const handleLoadReaquest = () => {
        axios.get("http://localhost:4000/user/liste_request", { withCredentials: true })
            .then(response => {
                let tab = []
                for (var i = 0; i < response.data.length; i++) {
                    tab.push(response.data[i]);
                }
                setlisterequest(tab);
            })
    }
    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        handleLoadReaquest();
    }, [])
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
        if (!cookieFound) {
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
                        <div className='request-settings'>
                            <div className='icone-back'>
                                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                            </div>
                            <div className='titre_section'>
                                <h1 className='settings-titre'>Demandes de suivi</h1>
                            </div>
                        </div>
                        <div className='liste-request'>
                            {liste_request.length > 0 ? (
                                liste_request.map((request, index) =>
                                    <Request key={index} {...request} user={user} />
                                )
                            ) : (
                                <h1 className="title-request">Aucune demande n'a été trouvée.</h1>
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
}

export default FollowRequest;