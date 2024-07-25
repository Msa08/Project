import React, { useState, useEffect } from 'react';
import SideBar from '../MainPage/SideBar';
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import { Tweet } from '../commentaire/Commentaire';
import axios from 'axios';
import "./saved.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Saved(props) {
    const navigate = useNavigate();
    const [list_twist, setlist_twist] = useState([])
    const user = props.user
    const handleBack = () => {
        navigate(-1)
    }

    const loadArchive = () => {
        axios.get("http://localhost:4000/twist/liste_archive", { withCredentials: true })
            .then(response => {
                let tab = []
                for (var i = 0; i < response.data.length; i++) {
                    const newComment = {
                        pseudo: response.data[i].user,
                        content: response.data[i].content,
                        time: response.data[i].time,
                        like: response.data[i].like,
                        retweet: response.data[i].retweet,
                        archive: response.data[i].archive,
                        id: response.data[i]._id
                    };
                    tab.push(newComment);
                }
                setlist_twist(tab);
            })
    }

    useEffect(() => {
        loadArchive();
    }, [])
    
    useEffect(() => {
        console.log(user)
        if(!user.logged){
            navigate('/connexion')
        }
        
    }, [user])

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
                                <h1 className='settings-titre'>Twist enregistrés</h1>
                            </div>
                        </div>
                        <div className='liste-saved'>
                            {list_twist.length > 0 ? (
                                list_twist.map((comment, index) => (
                                    <Tweet key={index} {...comment} user={user} />)
                                )
                            ) : (
                                <h1 className="title-request">Aucun twist enregistré.</h1>
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

export default Saved;