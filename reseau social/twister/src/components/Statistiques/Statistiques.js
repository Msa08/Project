import React, { useState, useEffect } from 'react';
import SideBar from '../MainPage/SideBar';
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./statistiques.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faUserGroup, faMessage, faHeart, faRetweet, faBookmark,faHandshakeSimple,faHashtag } from '@fortawesome/free-solid-svg-icons'

function Statistiques(props) {
    const navigate = useNavigate();
    const user = props.user
    const [stats, setstats] = useState({})

    const handleLoadStat = () => {
        axios.get('http://localhost:4000/stats/', { withCredentials: true })
            .then(response => {
                setstats(response.data)
            })
    }
    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        handleLoadStat();
    }, [])

    useEffect(() => {
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
                        <div className='saved-settings'>
                            <div className='icone-back'>
                                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                            </div>
                            <div className='titre_section'>
                                <h1 className='settings-titre'>Vos Statistiques</h1>
                            </div>
                        </div>
                        <div className='stats'>
                            <div className='stats-supérieur'>
                                <div className='stat-affichage'>
                                    <div className='stat-icone'>
                                        <FontAwesomeIcon icon={faUserGroup} size="2xl" />
                                    </div>
                                    <div className='stat-name'>
                                        Total Abonnés
                                    </div>
                                    <div className='stat-number'>
                                        <h1 className='statistique-nb'>{stats.nb_abonné}</h1>
                                    </div>
                                </div>
                                <div className='stat-affichage'>

                                <div className='stat-icone'>
                                    <FontAwesomeIcon icon={faHandshakeSimple} size="2xl"  />
                                    </div>
                                    <div className='stat-name'>
                                        Meilleur ami
                                    </div>
                                    <div className='stat-number'><h1 className='statistique-nb'>{stats.best_conv}</h1></div>
                                </div>
                                <div className='stat-affichage'>
                                    <div className='stat-icone'>
                                    <FontAwesomeIcon icon={faHashtag} size="2xl"/>
                                    </div>
                                    <div className='stat-name'>
                                        Hashtag préféré
                                    </div>
                                    <div className='stat-number'>
                                        <h1 className='statistique-nb'>#{stats.hashtags}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='stat-inférieur'>
                                <div className='stat-affichage1'>
                                <div className='stat-icone'>
                                        <FontAwesomeIcon icon={faMessage} size="2xl" />
                                    </div>
                                    <div className='stat-name'>
                                        Twist postés
                                    </div>
                                    <div className='stat-number'>
                                        <h1 className='statistique-nb'>{stats.nb_twist}</h1>
                                    </div>
                                    
                                </div>
                                <div className='stat-affichage2'>
                                <div className='stat-icone'>
                                        <FontAwesomeIcon icon={faHeart} size="2xl" />
                                    </div>
                                    <div className='stat-name'>
                                        Like total
                                    </div>
                                    <div className='stat-number'>
                                        <h1 className='statistique-nb'>{stats.nb_like}</h1>
                                    </div>
                                </div>
                                <div className='stat-affichage2'>
                                <div className='stat-icone'>
                                        <FontAwesomeIcon icon={faRetweet} size="2xl" />
                                    </div>
                                    <div className='stat-name'>
                                        Total Retwist
                                    </div>
                                    <div className='stat-number'><h1 className='statistique-nb'>{stats.nb_rt}</h1></div>
                                
                                </div>
                                <div className='stat-affichage2'>
                                <div className='stat-icone'>
                                        <FontAwesomeIcon icon={faBookmark} size="2xl" />
                                    </div>
                                    <div className='stat-name'>
                                        Total Archives
                                    </div>
                                    <div className='stat-number'><h1 className='statistique-nb'>{stats.nb_archive}</h1></div>


                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-pane">
                        <LeftSideBar user={user} />
                    </div>
                </section >
            </div >
        )
}

export default Statistiques;