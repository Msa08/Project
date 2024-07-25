import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faUser, faCog, faBookmark, faUserPlus, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './SideBar.css'
import { useNavigate } from 'react-router-dom';


function SideBar(props) {
    const user = props.user
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <button onClick={() => navigate('/discussions')} className='Sidebar-Button' >
                        <FontAwesomeIcon icon={faEnvelope} className='Sidebar-Icon' />
                        Messages
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/profil/' + user.pseudo)} className='Sidebar-Button'>
                        <FontAwesomeIcon icon={faUser} className='Sidebar-Icon' />
                        Profil
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/saved')} className='Sidebar-Button' >
                        <FontAwesomeIcon icon={faBookmark} className='Sidebar-Icon' />
                        Saved
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/friend_request')} className='Sidebar-Button' >
                        <FontAwesomeIcon icon={faUserPlus} className='Sidebar-Icon' />
                        Demandes de suivi
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/search/')} className='Sidebar-Button' >
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='Sidebar-Icon' />
                        Research
                    </button>
                </li>
                <li>
                    <button onClick={() => navigate('/settings/' + user.pseudo)} className='Sidebar-Button' >
                        <FontAwesomeIcon icon={faCog} className='Sidebar-Icon' />
                        Settings
                    </button>
                </li>

            </ul>
        </div>
    );
};

export default SideBar;
