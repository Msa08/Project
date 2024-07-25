import React from 'react';
import { useState, useEffect, useRef } from 'react';
import axios from 'axios'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SideBar from '../MainPage/SideBar';
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import BarSearch from '../BarSearch/BarSearch';
import AlignItemsList from './AlignItemsList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faPaperPlane, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useSearchParams } from 'react-router-dom';
import "./discussions.css";

function Conversation(props) {
    const navigate = useNavigate();
    const { username } = props;
    const [liste_message, setListe_message] = useState([]);
    const [message, setmessage] = useState("");
    const [sent, setsent] = useState(false);
    const msgLiveRef = useRef(null);

    const handleInputChange = (event) => {
        setmessage(event.target.value);
    };

    const handleBack = () => {
        navigate(-1);
    };

    const getListeMessage = () => {
        axios
            .get("http://localhost:4000/chat/list_message/" + username, {
                withCredentials: true,
            })
            .then((response) => {
                let tab = [];
                for (var i = 0; i < response.data.length; i++) {
                    tab.push({
                        sender: response.data[i].sender,
                        content: response.data[i].content,
                    });
                }
                setListe_message(tab);
                setmessage('');
            });
    };

    useEffect(() => {
        getListeMessage();
        setsent(false);
    }, [sent]);

    useEffect(() => {
        if (msgLiveRef.current) {
            msgLiveRef.current.scrollTop = msgLiveRef.current.scrollHeight;
        }
    }, [liste_message]);

    const handleSend = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const secondes = date.getSeconds();
        const jour = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const time = `${year}-${month}-${jour} ${hours}:${minutes}:${secondes} `;
        const new_message = {
            date: time,
            content: message,
        };
        axios
            .post("http://localhost:4000/chat/send_chat/" + username, new_message, {
                withCredentials: true,
            })
            .then((response) => {
                console.log(response.data);
                setsent(true);
                props.function();
                props.message();
            });
    };

    return (
        <div className="chatPane">
            <div className="chatName">
                <div className="chatBackFleche">
                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                </div>
                <div className="interloc" style={{ cursor: 'pointer' }} onClick={() => navigate('/profil/' + username)}>{username}</div>
            </div>
            <div className="msg-live" ref={msgLiveRef}>
                {liste_message.map((message, index) => (
                    <div key={index}>
                        <Message {...message} username={username} />
                    </div>
                ))}
            </div>
            <div className="tapping-bar">
                <div className="chatapping">
                    <input
                        className="chatapping-bar"
                        placeholder="Message"
                        value={message}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="sending-icon">
                    <FontAwesomeIcon

                        className="icon-edit"
                        icon={faPaperPlane}
                        style={{ color: "#0084ff", cursor: 'pointer' }}
                        onClick={handleSend}
                    />
                </div>
            </div>
        </div >
    );
}


function Message(props) {
    const { sender, content, username } = props;
    const [selectedPp, setselectedPp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");
    useEffect(() => {
        axios.get('http://localhost:4000/user/pp/' + sender, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
            .then(res => {
                if (res.data) {
                    if (res.data) {
                        const url = URL.createObjectURL(res.data);
                        setselectedPp(url)
                    }

                }
            })
    }, [])

    if (sender !== username) {
        return (
            <div className='abc'>
                <div className="msg-act1">
                    <div className="sender-name">Moi</div>
                    {content}
                </div>
                <img className="avatar1" src={selectedPp} alt="Avatar" />
            </div>
        )
    } else {
        return (
            <div className='def'>
                <img className="avatar2" src={selectedPp} alt="Avatar" />
                <div className="msg-act2">
                    <div className="sender-name">{sender}</div>
                    {content}
                </div>
            </div>
        )
    }
}

function Interlocuteur(props) {
    const { user_followed, followOrfollowers } = props
    const [selectedPp, setselectedPp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");
    useEffect(() => {
        axios.get('http://localhost:4000/user/pp/' + user_followed, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
            .then(res => {
                if (res.data) {
                    if (res.data) {
                        const url = URL.createObjectURL(res.data);
                        setselectedPp(url)
                    }

                }
            })
    }, [])
    return (
        <section className='partie-abonnement-discu'>
            <div className='pp-abonnement-discu'>
                <img src={selectedPp} className="pdp-abonnement" alt="pp-back" />
            </div>
            <div className='nom-abonnement-discu'>
                {(followOrfollowers === "follow" &&
                    <h3 className='pseudo-abonnement-discu'>
                        {user_followed}
                    </h3>)
                }
            </div>
        </section>
    );
}

function Discussions(props) {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [open1, setopen1] = useState(searchParams.get('open'));
    const [selectedConversation, setSelectedConversation] = useState(null);
    const user = props.user
    const [liste_follows, setlistefollows] = useState([])
    const [list_conversation, set_list_conversation] = useState([])
    const [loadconversation, setloadconversation] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = async () => {
        try {
            await axios.get('http://localhost:4000/user/liste_follows/' + user.pseudo, { withCredentials: true })
                .then(res => {
                    let tab = []
                    for (var i = 0; i < res.data.length; i++) {
                        tab.push(res.data[i]);
                    }
                    setlistefollows(tab);
                })
            setOpen(true)
        }
        catch (error) {
            console.error(error.message)
        }
    };

    const handleClose = () => setOpen(false);
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

    const handleSearchfollow = async (param) => {
        try {
            await axios.post('http://localhost:4000/user/search_follows/' + user.pseudo, { search: param }, { withCredentials: true })
                .then(res => {
                    let tab = []
                    for (var i = 0; i < res.data.length; i++) {
                        tab.push(res.data[i]);
                    }
                    setlistefollows(tab);
                })
        }
        catch (error) {
            console.error(error.message)
        }
    }

    const handleSearchconv = async (param) => {
        try {
            await axios.post('http://localhost:4000/chat/search_conv/', { search: param }, { withCredentials: true })
                .then(res => {
                    let tab = []
                    for (var i = 0; i < res.data.length; i++) {
                        tab.push(res.data[i]);
                    }
                    set_list_conversation(tab);
                })
        }
        catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        setSelectedConversation(null);
    },)
    const handleBack = () => {
        navigate(-1)
    }
    const get_list_conversation = () => {
        axios.get('http://localhost:4000/chat/list_conversation', { withCredentials: true })
            .then(response => {
                let tab = []
                for (var i = 0; i < response.data.length; i++) {
                    tab.push(response.data[i])
                }
                set_list_conversation(tab)
            })
    }


    const handleConversationSelect = (key) => {
        navigate('/discussions?open=' + list_conversation[key].user)
        setSelectedConversation(list_conversation[key].user);
    };


    const handleLoadConversation = () => {
        setloadconversation(true);
    }

    const add_conversation = (index) => {
        if (list_conversation.findIndex(object => object.user === liste_follows[index].user_followed) === -1) {
            list_conversation.unshift({ user: liste_follows[index].user_followed });
            console.log(list_conversation)
        }
        setopen1(liste_follows[index].user_followed)
        handleClose();
    }
    useEffect(() => {
        get_list_conversation();
        setloadconversation(false);
        setopen1(searchParams.get('open'));
    }, [selectedConversation], [loadconversation])

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

    useEffect(() => {
        console.log(user)
        if(!user.logged){
            navigate('/connexion')
        }
        
    }, [user])

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
                        <section className='container-discussion'>
                            <div className='pannel-discussion'>
                                <div className='icone-back'>
                                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                                </div>
                                <div className='titre_section'>
                                    <h1 className='settings-titre'>Discussion</h1>
                                </div>
                            </div>
                            <div className='pannel-liste-message'>
                                <div className='list-item-msg'>
                                    <div className='panneau-bar-btn'>
                                        <div className='bar-recherche-discu'><BarSearch function={handleSearchconv} /></div>
                                        <div className='icon-new-discu'>
                                            <button className='btn-new-discu' onClick={handleOpen} >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        Nouvelle Discussion
                                                    </Typography>
                                                    <BarSearch function={handleSearchfollow} />
                                                    {liste_follows.map((follows, index) => (
                                                        <div key={index} onClick={() => add_conversation(index)}>
                                                            <Interlocuteur {...follows} followOrfollowers={"follow"} user={user} />
                                                        </div>))
                                                    }
                                                </Box>
                                            </Modal>
                                        </div>
                                    </div>
                                    <div className='liste-discussions'>
                                        {list_conversation.map((conv, index) => (
                                            <div key={index} onClick={() => handleConversationSelect(index)}>
                                                <AlignItemsList key={list_conversation.length} {...conv} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className='message-pane'>
                                    {(selectedConversation !== null ? (
                                        <Conversation key={selectedConversation} username={selectedConversation} function={handleLoadConversation} message={get_list_conversation} />
                                    ) : null) || (open1 !== null ? (
                                        <Conversation key={open1} username={open1} function={handleLoadConversation} message={get_list_conversation} />
                                    ) : <div className='nonDisplay'><h1>Débutez une conversation ! </h1></div>)}
                                </div>
                            </div>
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

export default Discussions;