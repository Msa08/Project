import React, { useEffect } from 'react';
import SideBar from '../MainPage/SideBar';
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./statistiques.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function TwistStat(props) {
    const navigate = useNavigate();
    const user = props.user
    // const [stats, setstats] = useState({})

    const handleLoadStat = () => {
        axios.get('http://localhost:4000/stats/', { withCredentials: true })
            .then(response => {
                // setstats(response.data)
            })
    }
    const handleBack = () => {
        navigate(-1)
    }

    useEffect(() => {
        handleLoadStat();
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
                                <h1 className='settings-titre'>Statistique du twist</h1>
                            </div>
                        </div>
                        <div className='stats'>
                            <div className='nb-ab'><h1>Nombre de like:</h1></div>
                            <div className='nb-t'><h1>Nombre de retwist :</h1></div>
                            <div className='nb-l'><h1>Nombre d'archives : </h1></div>
                            <div className='nb-r'><h1>Nombre total de vue: </h1></div>
                            <div className='nb-a'><h1> Catégorie du twist :</h1></div>
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

export default TwistStat;