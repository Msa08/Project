import React, { useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import './commentaire.css'
import { faHeart, faRetweet, faTrashCan, faBookmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


export function Tweet(props) {
    const [liked, setLiked] = useState(false);
    const [retweeted, setRetweet] = useState(false);
    const [archived, setArchive] = useState(false);
    const [likeCount, setLikeCount] = useState(props.likeCount || 0);
    const [retweetCount, setRetweetCount] = useState(props.retweetCount || 0);
    const [archiveCount, setArchiveCount] = useState(props.archiveCount || 0);
    const [selectedPp, setselectedPp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");
    const { pseudo, content, time, id, user, reload } = props;
    const affichage = props.affichage
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [picture,setpicture] = useState("");

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

    const handleRetweet = () => {
        if (user.logged) {
            if (retweeted) {
                axios.post("http://localhost:4000/twist/unrt_twist", {
                    "_id": id
                }, { withCredentials: true })
                    .catch(error => {
                        console.error(error);
                    });
                setRetweet(false)
                setRetweetCount(retweetCount - 1)
            }
            else {
                axios.post("http://localhost:4000/twist/rt_twist", {
                    "_id": id
                }, { withCredentials: true })
                    .catch(error => {
                        console.error(error);
                    });
                setRetweet(true);
                setRetweetCount(retweetCount + 1)
            }
        }
        else {
            navigate('/connexion')
        }
    }

    const handleLike = () => {
        if (user.logged) {
            if (liked) {
                axios.post("http://localhost:4000/twist/unlike_twist", {
                    "_id": id
                }, { withCredentials: true })
                    .catch(error => {
                        console.error(error);
                    });
                setLiked(false)
                setLikeCount(likeCount - 1)
            } else {
                axios.post("http://localhost:4000/twist/like_twist", {
                    "_id": id
                }, { withCredentials: true })
                    .catch(error => {
                        console.error(error);
                    });
                setLiked(true)
                setLikeCount(likeCount + 1)

            }
        }
        else {
            navigate("/connexion")
        }
    };

    const handleArchive = () => {
        if (user.logged) {
            if (archived) {

                axios.post("http://localhost:4000/twist/unarchive_twist", {
                    "_id": id
                }, { withCredentials: true })
                    .catch(error => {
                        console.error(error);
                    });
                setArchive(false)
                setArchiveCount(archiveCount - 1)
            } else {
                axios.post("http://localhost:4000/twist/archive_twist", {
                    "_id": id
                }, { withCredentials: true })
                    .catch(error => {
                        console.error(error);
                    });
                setArchive(true)
                setArchiveCount(archiveCount + 1)

            }
        }
        else {
            navigate("/connexion")
        }
    };

    const is_like = () => {
        axios.post("http://localhost:4000/twist/islike", {
            "_id": id
        }, { withCredentials: true })
            .then(response => {
                setLiked(response.data.like)
            })
            .catch(error => {
                console.error(error);
            });

        axios.post("http://localhost:4000/twist/isrt", {
            "_id": id
        }, { withCredentials: true })
            .then(response => {
                setRetweet(response.data.rt)
            })
            .catch(error => {
                console.error(error);
            });
        axios.post("http://localhost:4000/twist/isarchive", {
            "_id": id
        }, { withCredentials: true })
            .then(response => {
                setArchive(response.data.archive)
            })
            .catch(error => {
                console.error(error);
            });
        axios.post("http://localhost:4000/twist/get_like_count",
            { "id": id }, { withCredentials: true })
            .then(response => {

                setLikeCount(response.data.like)
            })
            .catch(error => {
                console.error(error);
            });

        axios.post("http://localhost:4000/twist/get_rt_count", {
            "id": id
        }, { withCredentials: true })
            .then(response => {
                setRetweetCount(response.data.rt)
            })
            .catch(error => {
                console.error(error);
            });
        axios.post("http://localhost:4000/twist/get_archive_count", {
            "id": id
        }, { withCredentials: true })
            .then(response => {
                setArchiveCount(response.data.archive)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleDelete = async () => {
        await axios.delete("http://localhost:4000/twist/delete_twist" + id, { withCredentials: true })
            .then(response => {
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
        setOpen(false);
    }
    useEffect(() => {
        is_like();
            setpicture("");
        axios.get('http://localhost:4000/user/pp/' + pseudo, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
            .then(res => {
                    if (res.data) {
                        const url = URL.createObjectURL(res.data);
                        setselectedPp(url)
                    }

            })
        axios.get('http://localhost:4000/twist/picture/'+id,{ responseType: 'blob', withCredentials: true })
            .then(res=>{
                if(res.status===200){
                    const url = URL.createObjectURL(res.data);
                    setpicture(url)
                    console.log(url)
                }
            })
    }, [affichage,reload])

    const heartIcon = <FontAwesomeIcon icon={faHeart} className={liked ? "liked" : ""} />;
    const heartIconHTML = ReactDOMServer.renderToString(heartIcon);

    const RTIcon = <FontAwesomeIcon icon={faRetweet} className={retweeted ? "retweeted" : ""} />
    const RTIconHTML = ReactDOMServer.renderToString(RTIcon);




    return (
        <div className="tweet">
            <div className='fonctionnel'>
                <div className='twist-pdp' onClick={() => navigate('/profil/' + pseudo)} style={{ cursor: 'pointer' }}>
                    <img src={selectedPp} alt="avatar" className="tweet-img-comment" />
                </div>
                <div className="tweet-content">
                    <div className="tweet-username">{pseudo}</div>
                    <div className="tweet-message">
                        <div className='ecriture'>{content}</div>
                        {picture!=="" && <img src={picture} alt="avatar" className='photo-de-tweet' />}
                    </div>

                    <div className="icons-container">
                        <div className="like-button" onClick={handleLike} dangerouslySetInnerHTML={{ __html: heartIconHTML }} />
                        <div className="like-count">{likeCount}</div>
                        <div className="retweet-button" onClick={handleRetweet} dangerouslySetInnerHTML={{ __html: RTIconHTML }} />
                        <div className="retweet-count">{retweetCount}</div>
                        <div className={archived ? "archive-btn" : "archive-button"} onClick={handleArchive}><FontAwesomeIcon icon={faBookmark} /></div>
                        <div className="archive-count">{archiveCount}</div>
                    </div>
                    <div className="tweet-time">{time}</div>
                </div>
            </div>
            {
                pseudo === user.pseudo && (<div className='delete-button' >
                    <FontAwesomeIcon onClick={handleOpen} style={{ cursor: 'pointer' }} icon={faTrashCan} />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>

                            <h2 id="parent-modal-title">Supprimer ce twist ? </h2>
                            <p id="parent-modal-description">
                                Etes vous sûr de vouloir supprimé ce twist ? Une fois supprimé, il vous sera impossible de récupérer le twist.
                            </p>
                            <div className='delete-twist-pannel'>
                                <button onClick={handleDelete}>Oui, supprimer le twist</button>
                                <button onClick={handleClose}>Annuler</button>
                            </div>
                        </Box>
                    </Modal>
                </div>)
            }
        </div >
    );
}


function Commentaire(props) {
    const [new_comment, set_new_comment] = useState(false);
    const [comments, setComments] = useState([]);
    const [reload, setReaload] = useState(0);
    const [text, setText] = useState("");
    const user = props.user
    const pseudo = user.pseudo
    const [post, setpost] = useState(false)
    const [filepicture, setfilepicture] = useState("")
    const [picture, setpicture] = useState("")

    const handleChange = (event) => {
        const maxChars = 1000; // Limite de caractères
        const textareaLineHeight = 24; // ajuster la hauteur de ligne en fonction de votre style
        const minRows = 1; // nombre minimum de lignes
        const maxRows = 100; // nombre maximum de lignes
        const previousRows = event.target.rows;
        event.target.rows = minRows; // réinitialiser le nombre de lignes à 1 à chaque saisie

        // Tronquer la chaîne de caractères si elle dépasse la limite de caractères
        const currentValue = event.target.value;
        if (currentValue.length > maxChars) {
            event.target.value = currentValue.substring(0, maxChars);
        }

        const currentRows = Math.ceil(event.target.scrollHeight / textareaLineHeight);

        if (currentRows === previousRows) {
            event.target.rows = currentRows;
        }

        if (currentRows >= maxRows) {
            event.target.rows = maxRows;
            event.target.scrollTop = event.target.scrollHeight;
        }

        setText(event.target.value);
    };

    const post_twist = (elem, time) => {
        axios.post("http://localhost:4000/twist/post_twist", {
            "user": pseudo,
            "content": elem,
            "like": 0,
            "retweet": 0,
            "time": time,
            "archive": 0
        }, { withCredentials: true })
            .then(response => {
                if(filepicture!==""){
                    sendpicture(response.data.id);
                    setfilepicture("");
                    setpicture("");
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    const load_twist = () => {
        axios.get("http://localhost:4000/twist/liste_twist", { withCredentials: true })
            .then(response => {
                let tableau = [];
                for (var i = 0; i < response.data.length; i++) {
                    const newComment2 = {
                        pseudo: response.data[i].user,
                        content: response.data[i].content,
                        time: response.data[i].time,
                        like: response.data[i].like,
                        retweet: response.data[i].retweet,
                        id: response.data[i]._id,
                        archive: response.data[i].archive
                    };
                    tableau.push(newComment2);
                }
                setComments(tableau.reverse());
                setReaload(reload + 1)
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handlepictureInputClick = (event) => {
        document.getElementById('pictureInput').click();
    };

    const handleaddpicture = (event) => {
        const file = event.target.files[0];
        setfilepicture(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setpicture(reader.result);
        }
    }

    const sendpicture = async (id_tweet) =>{
        const formData = new FormData();
        formData.append("picture", filepicture);
        formData.append("id",id_tweet)
        await axios.post("http://localhost:4000/twist/sendpicture", formData, { withCredentials: true })
            .then(response => {
                setfilepicture("");
                setpicture("");
                // const reader = new FileReader();
                // reader.readAsDataURL(filepicture);
                // reader.onload = () => {
                //     setselectedPp(reader.result);
                // };
            })
            .catch(error => {
                console.error(error);
            });
    }

    const add_commentaire = () => {
        const elem = document.getElementById("search").value;

        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const secondes = date.getSeconds()
        const jour = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const time = `${year}-${month}-${jour} ${hours}:${minutes}:${secondes} `; // Créer une chaîne de caractères de l'heure au format HH:MM

        post_twist(elem, time);
        setpost(true)
        set_new_comment(false);
        setText("");
        
    }

    const open_newcom = () => {
        set_new_comment(true);
    }

    useEffect(() => {
        load_twist()
        setpost(false)
    }, [post])

    return (
        <section className='corps_tweet'>
            <div className='Commentaire'>
                {new_comment &&
                    <div>
                        <div className='disposition-btn'>
                            <div className='zone-txt'><TextareaAutosize
                                className="tweet-area comment-box"
                                placeholder=" Écrivez votre commentaire ici..."
                                value={text}
                                onChange={handleChange}
                                id="search"
                            /></div>
                            <div className='idee'></div>
                            {filepicture==="" && (<div className='img-comment'>
                                <button className='btn-insertion' onClick={handlepictureInputClick}>Image</button>
                                <input
                                    id="pictureInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleaddpicture}
                                />
                            </div>)}
                            {filepicture!=="" && (<div className='img-comment'>
                                <img src={picture} alt="avatar" className='photo-de-tweet' style={{cursor:'pointer'}} onClick={handlepictureInputClick}/>
                                <input
                                    id="pictureInput"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={handleaddpicture}
                                />
                            </div>)}
                        </div>
                        <button onClick={add_commentaire}>Envoyer !</button>
                    </div>
                }
                {
                    !new_comment && (user.logged && <div>
                        <button onClick={open_newcom}>Commenter !</button>
                    </div>)
                }
                <div className='maListe'>
                    {comments.map((comment, index) => (
                        <Tweet key={index} {...comment} user={user} affichage={"tweet"} reload={reload} />
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Commentaire;
