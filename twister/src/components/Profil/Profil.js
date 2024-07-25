import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios'
import SideBar from '../MainPage/SideBar';
import './profil.css'
import Header from '../Header'
import LeftSideBar from '../MainPage/LeftSideBar';
import BarSearch from '../BarSearch/BarSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faArrowLeft, faPaperPlane, faXmark, faCamera, faBan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Tweet } from '../commentaire/Commentaire';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';




function Abonnement(props) {
    const { user_follow, user_followed, follow, followOrfollowers, user } = props
    const navigate = useNavigate();
    const [isFollow, setisFollow] = useState(follow)
    const [isAsked, setAsked] = useState("")
    const [selectedPp, setselectedPp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");
    useEffect(() => {
        if (followOrfollowers === "follow") {
            axios.get('http://localhost:4000/user/isfollow/' + user_followed, { withCredentials: true })
                .then(response => {
                    setisFollow(response.data.follow);
                    console.log(response.data.follow)
                    if (!response.data.follow) {
                        axios.get('http://localhost:4000/user/isAsked/' + user_followed, { withCredentials: true })
                            .then(response => {
                                setAsked(response.data.asked);
                            })
                    }
                })
            axios.get('http://localhost:4000/user/pp/' + user_followed, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
                .then(res => {
                    if (res.data) {
                        if (res.data) {
                            const url = URL.createObjectURL(res.data);
                            setselectedPp(url)
                        }

                    }
                })

        }
        else {
            axios.get('http://localhost:4000/user/isfollow/' + user_follow, { withCredentials: true })
                .then(response => {
                    setisFollow(response.data.follow);
                    console.log(response.data.follow)
                    if (!response.data.follow) {
                        axios.get('http://localhost:4000/user/isAsked/' + user_follow, { withCredentials: true })
                            .then(response => {
                                setAsked(response.data.asked);
                                console.log(response.data.asked)
                            })
                    }
                })
            axios.get('http://localhost:4000/user/pp/' + user_follow, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
                .then(res => {
                    if (res.data) {
                        if (res.data) {
                            const url = URL.createObjectURL(res.data);
                            setselectedPp(url)
                        }

                    }
                })
        }

    }, [isFollow])
    const handleFollow = () => {
        if (followOrfollowers === "follow") {
            axios.post('http://localhost:4000/user/follow/' + user_followed, {}, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        setisFollow(true);
                    }
                    if (response.status === 205) {
                        setAsked(true)
                    }
                })
        }
        else {
            axios.post('http://localhost:4000/user/follow/' + user_follow, {}, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        setisFollow(true);
                    }
                    if (response.status === 205) {
                        setAsked(true)
                    }
                })
        }
    }

    const handleUnfollow = () => {
        console.log("unfollow")
        if (followOrfollowers === "follow") {
            axios.delete('http://localhost:4000/user/unfollow/' + user_followed, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        setisFollow(false);
                    }
                })
        }
        else {
            axios.delete('http://localhost:4000/user/unfollow/' + user_follow, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        setisFollow(false);
                    }
                })
        }
    }

    const handleUnasked = () => {
        if (followOrfollowers === "follow") {
            axios.delete('http://localhost:4000/user/unasked/' + user_followed, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        setAsked(false);
                    }
                })
        }
        else {
            axios.delete('http://localhost:4000/user/unasked/' + user_follow, { withCredentials: true })
                .then(response => {
                    if (response.status === 200) {
                        setAsked(false);
                    }
                })
        }
    }

    const nav_profil = () => {
        if (followOrfollowers === "follow") {
            navigate("/profil/" + user_followed)
        }
        else {
            navigate("/profil/" + user_follow)
        }
    }


    return (
        <section className='partie-abonnement' style={{ cursor: 'pointer' }} >
            <div className='pp-abonnement'>
                <img src={selectedPp} className="pdp-abonnement" alt="pp-back" />
            </div>
            <div className='nom-abonnement' onClick={() => nav_profil()}>
                {(followOrfollowers === "follow" &&
                    <h3 className='pseudo-abonnement'>
                        {user_followed}
                    </h3>) || (followOrfollowers === "followers" &&
                        <h3 className='pseudo-abonnement'>
                            {user_follow}
                        </h3>)
                }
            </div>
            <div className='unfollow-tac'>
                {
                    ((followOrfollowers === "follow" && (user.pseudo !== user_followed))) && (((!isFollow && ((!isAsked && <button className='add-btn' onClick={() => handleFollow()}>Follow</button>) || (<button className='add-btn' onClick={() => handleUnasked()}>Requested</button>))))
                        || (<button className='add-btn' onClick={() => handleUnfollow()}>Following</button>))
                }
                {
                    ((followOrfollowers === "followers" && (user.pseudo !== user_follow))) && (((!isFollow && ((!isAsked && <button className='add-btn' onClick={() => handleFollow()}>Follow</button>) || (<button className='add-btn' onClick={() => handleUnasked()}>Requested</button>))))
                        || (<button className='add-btn' onClick={() => handleUnfollow()}>Following</button>))
                }
            </div>
        </section>
    );
}

function Profil(props) {
    const navigate = useNavigate();
    const [Affichage, setAffichage] = useState("tweet");
    const [affichage, setaffichage] = useState("")
    const user = props.user;
    const [selectedFile, setSelectedFile] = useState("https://img.freepik.com/vecteurs-premium/banniere-degrade-bleu-ciel-moderne-formes-abstraites_278222-3179.jpg?w=1380");
    const [selectedPp, setselectedPp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");
    const [follow, setfollow] = useState(false)
    const [listetwist, setList] = useState([])
    const [liste_follows, setlistefollows] = useState([])
    const [liste_followers, setlistefollowers] = useState([])
    const [openfollow, setOpenfollow] = useState(false);
    const [openfollowers, setOpenfollowers] = useState(false)
    const [followOrfollowers, setfollowOrfollowers] = useState("")
    const [asked, setasked] = useState(false)
    const [openEdit, setOpenEdit] = useState(false);
    const [banner, setbanner] = useState("");
    const [pp, setpp] = useState("");
    const [filebanner, setfilebanner] = useState();
    const [filepp, setfilepp] = useState();
    const [bio, setbio] = useState();
    const [block, setblock] = useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const [tweetActive, setTweetActive] = useState(true);
    const [rtActive, setRtActive] = useState(false);
    const [likesActive, setLikesActive] = useState(false);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        height: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const handleBack = () => {
        navigate(-1)
    }

    const handleOpenfollow = async () => {
        try {
            setfollowOrfollowers("follow")
            await axios.get('http://localhost:4000/user/liste_follows/' + username, { withCredentials: true })
                .then(res => {
                    console.log(res.data)
                    let tab = []
                    for (var i = 0; i < res.data.length; i++) {
                        tab.push(res.data[i]);
                    }
                    setlistefollows(tab);
                })
            setOpenfollow(true);
        }
        catch (error) {
            console.error(error.message)
        }
    }
    const handleClosefollow = async() => {
        get_user();
        setOpenfollow(false);
    }

    const handleOpenfollowers = async () => {
        try {
            setfollowOrfollowers("followers")
            await axios.get('http://localhost:4000/user/liste_followers/' + username, { withCredentials: true })
                .then(res => {
                    console.log(res.data)
                    let tab = []
                    for (var i = 0; i < res.data.length; i++) {
                        tab.push(res.data[i]);
                    }
                    setlistefollowers(tab);
                })
            setOpenfollowers(true);
        }
        catch (error) {
            console.error(error.message)
        }
    }
    const handleClosefollowers = async() => {
        get_user();
        setOpenfollowers(false);
        
    }

    const { username } = useParams();
    const [searched_user, setSearched] = useState({});
    const get_user = async() => {
        await axios.get('http://localhost:4000/user/get_user/' + username, { withCredentials: true })
            .then(response => {
                if (response.data.pseudo === "user not found") {
                    setSearched(response.data)
                }
                else {
                    setSearched(response.data)
                    setbio(response.data.bio)

                    axios.get('http://localhost:4000/user/banner/' + response.data.pseudo, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
                        .then(res => {
                            if (res.data) {
                                const url = URL.createObjectURL(res.data);
                                setbanner(url)
                                setSelectedFile(url)
                            }
                            else {
                                setbanner(selectedFile)
                            }
                        })
                    axios.get('http://localhost:4000/user/pp/' + response.data.pseudo, { responseType: 'blob', withCredentials: true }) // Remplacez par le nom de fichier réel de l'image téléchargée
                        .then(res => {
                            if (res.data) {
                                if (res.data) {
                                    const url = URL.createObjectURL(res.data);
                                    setpp(url)
                                    setselectedPp(url)
                                }
                                else {
                                    setpp(selectedPp)
                                }

                            }
                        })
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
    const handleppInputClick = (event) => {
        document.getElementById('ppInput').click();
    };
    const handlebannerInputClick = (event) => {
        document.getElementById('bannerInput').click();
    };

    const handlechangeBanner = (event) => {
        const file = event.target.files[0];
        setfilebanner(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setbanner(reader.result);
        }
    }

    const handlechangePP = (event) => {
        const file = event.target.files[0];
        setfilepp(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setpp(reader.result);
        }
    }

    const saveimagechange = async () => {
        if (filepp) {
            const formData = new FormData();
            formData.append("pp", filepp);
            await axios.post("http://localhost:4000/user/upload_pp", formData, { withCredentials: true })
                .then(response => {
                    const reader = new FileReader();
                    reader.readAsDataURL(filepp);
                    reader.onload = () => {
                        setselectedPp(reader.result);
                    };
                })
                .catch(error => {
                    console.error(error);
                });
        }
        if (filebanner) {
            const formData2 = new FormData();
            formData2.append("banner", filebanner);
            await axios.post("http://localhost:4000/user/upload_banner", formData2, { withCredentials: true })
                .then(response => {
                    const reader = new FileReader();
                    reader.readAsDataURL(filebanner);
                    reader.onload = () => {
                        setSelectedFile(reader.result);
                    };
                })
                .catch(error => {
                    console.error(error);
                });
        }
        await axios.post("http://localhost:4000/user/changebio", { bio: bio }, { withCredentials: true })
            .then(response => {
                searched_user.bio = bio
            })
        handleCloseEdit();
    }


    const handleFollow = (event) => {
        event.preventDefault();
        console.log("coucou")
        axios.post('http://localhost:4000/user/follow/' + username, {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setfollow(true);
                }
                if (response.status === 205) {
                    setasked(true);
                }

            })
    }

    const handleUnfollow = (event) => {
        event.preventDefault();
        console.log("unfollow")
        axios.delete('http://localhost:4000/user/unfollow/' + username, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setfollow(false);
                }
            })
    }

    const isFollow = () => {
        axios.get('http://localhost:4000/user/isfollow/' + username, { withCredentials: true })
            .then(response => {
                setfollow(response.data.follow);
            })

    }

    const handleAffichage = () => {
        if (Affichage === "tweet") {
            axios.get('http://localhost:4000/twist/liste_tweet/' + username, { withCredentials: true })
                .then(response => {
                    let tableau = [];
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
                        tableau.push(newComment);
                    }
                    setList(tableau);
                    setaffichage("tweet")
                });
        }
        if (Affichage === "rt") {
            axios.get('http://localhost:4000/twist/liste_rt/' + username, { withCredentials: true })
                .then(response => {
                    let tableau = [];
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
                        tableau.push(newComment);
                    }
                    setList(tableau);
                    setaffichage("rt")
                });
        }
        if (Affichage === "likes") {
            axios.get('http://localhost:4000/twist/liste_like/' + username, { withCredentials: true })
                .then(response => {
                    let tableau = [];
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
                        tableau.push(newComment);
                    }
                    setList(tableau);
                    setaffichage("likes")
                });
        }

    }

    const handleUnasked = () => {
        axios.delete('http://localhost:4000/user/unasked/' + username, { withCredentials: true })
            .then(response => {
                setasked(false);
            })
    }

    const isAsked = () => {
        axios.get('http://localhost:4000/user/isAsked/' + username, { withCredentials: true })
            .then(response => {
                setasked(response.data.asked);
            })
    }

    const handleDiscussion = () => {
        navigate("/discussions?open=" + searched_user.pseudo)
    }

    const handleSearchfollow = async (param) => {
        try {
            await axios.post('http://localhost:4000/user/search_follows/' + username, { search: param }, { withCredentials: true })
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

    const handleSearchfollowers = async (param) => {
        try {
            await axios.post('http://localhost:4000/user/search_followers/' + username, { search: param }, { withCredentials: true })
                .then(res => {
                    let tab = []
                    for (var i = 0; i < res.data.length; i++) {
                        tab.push(res.data[i]);
                    }
                    setlistefollowers(tab);
                })
        }
        catch (error) {
            console.error(error.message)
        }
    }

    const handleBlock = () => {
        axios.post('http://localhost:4000/user/block/' + searched_user.pseudo, {}, { withCredentials: true })
        setblock(true)
    }

    const isblock = () => {
        axios.get("http://localhost:4000/user/isblock/" + username, { withCredentials: true })
            .then(res => {
                setblock(res.data.block)
            })
    }

    useEffect(() => {
        handleAffichage();
    }, [navigate, Affichage])

    useEffect(() => {
        isFollow();
    }, [navigate])
    useEffect(() => {
        get_user();
        props.connect();
        setOpenfollow(false);
        setOpenfollowers(false)
        setAffichage("tweet")
    }, [navigate, follow])
    useEffect(() => {
        isAsked();
    }, [navigate, asked])

    useEffect(() => {
        isblock();
    }, [])

    useEffect(() => {
        console.log(user)
        if(!user.logged){
            navigate('/connexion')
        }
        
    }, [user])
    if (user.pseudo === username) {
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
                            <section className="main-pane-profile">
                                <div className='profile-setting'>
                                    <div className='icone-back'>
                                        <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                                    </div>
                                    <div className='titre_section'>
                                        <h1 className='settings-titre'>{username}</h1>
                                    </div>
                                </div>
                                <div className='background-picture'>
                                    <img src={selectedFile} className="image_de_fond" alt="pp-back" />
                                </div>
                                <div className='pp-section'>
                                    <div class="avatar-container">
                                        <img src={selectedPp} alt="avatar" className="tweet-img" />
                                    </div>
                                </div>

                                <div className='info-profile'>
                                    <section className="container-usernanme">
                                        <div className='info-username'>
                                            <h1 className='name-prenom'>{searched_user.nom} {searched_user.prenom}</h1>
                                            <h2 className='username'>@{searched_user.pseudo}</h2>
                                        </div>
                                        <div className='config-button'>
                                            <button className="config-btn" onClick={handleOpenEdit}>
                                                <FontAwesomeIcon className='icon-edit' icon={faPencil} />
                                            </button>
                                            <Modal
                                                open={openEdit}
                                                onClose={handleCloseEdit}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                                className='abcd'
                                            >
                                                <Box sx={style}>
                                                    <div className='edit-pannel-principal'>
                                                        <div className='edit-pannel-up'>
                                                            <div className='edit-pannel-up-left'><FontAwesomeIcon icon={faXmark} size="lg" onClick={handleCloseEdit} /></div>
                                                            <div className='edit-pannel-up-mid'> Editer le profil</div>
                                                            <div className='edit-pannel-up-right'><button className='btn-save' onClick={saveimagechange}>Enregistrer</button></div>
                                                        </div>

                                                        <div className='background-picture'>
                                                            <img src={banner} className="image_de_fond" alt="pp-back" />
                                                            <FontAwesomeIcon className='iii' icon={faCamera} size="2xl" onClick={handlebannerInputClick} />
                                                            <input
                                                                id="bannerInput"
                                                                type="file"
                                                                accept="image/*"
                                                                style={{ display: 'none' }}
                                                                onChange={handlechangeBanner}
                                                            />
                                                        </div>
                                                        <div className='pp-section'>
                                                            <div class="avatar-container2">
                                                                <div className='gaauche'>
                                                                    <img src={pp} alt="avatar" className="tweet-img" />
                                                                    <FontAwesomeIcon className='i' icon={faCamera} size="lg" onClick={handleppInputClick} />
                                                                    <input
                                                                        id="ppInput"
                                                                        type="file"
                                                                        accept='image/*'
                                                                        style={{ display: 'none' }}
                                                                        onChange={handlechangePP}
                                                                    />
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className='edit-pannel-down'>
                                                            <TextField
                                                                style={{ width: '100%' }}
                                                                id="filled-multiline-static"
                                                                label="Bio"
                                                                multiline
                                                                rows={4}
                                                                defaultValue={bio}
                                                                onChange={(e) => setbio(e.target.value)}
                                                                variant="filled"
                                                                inputProps={{
                                                                    maxLength: 100
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </Box>
                                            </Modal>
                                        </div>
                                    </section>
                                    <div className='abonne'>
                                        <div className='abonnement' >
                                            <div onClick={handleOpenfollow}>Abonnements</div>
                                            <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                open={openfollow}
                                                style={{ maxWidth: '50%', margin: 'auto' }}
                                                closeAfterTransition
                                                slots={{ backdrop: Backdrop }}
                                                slotProps={{
                                                    backdrop: {
                                                        timeout: 500,
                                                    },
                                                }}

                                            >
                                                <Fade in={openfollow}>
                                                    <Box className="modal-abonnement">
                                                        <div className='modal-abonnement-titre'>
                                                            <h2 className='modal-title'>Abonnement</h2>
                                                            <div className="exit-button" onClick={handleClosefollow}>X</div>
                                                        </div>
                                                        <BarSearch function={handleSearchfollow} />
                                                        <div className='liste-abo'>
                                                            {liste_follows.map((follows, index) => (
                                                                <Abonnement key={index} {...follows} follow={follow} followOrfollowers={followOrfollowers} user={user} />))}
                                                        </div>
                                                    </Box>
                                                </Fade>
                                            </Modal>
                                            <div className='nb-abonnement'>{user.nb_follow}</div>
                                        </div>
                                        <div className={"abonnes"}>
                                            <div onClick={handleOpenfollowers}>Abonnés</div>
                                            <Modal
                                                aria-labelledby="transition-modal-title"
                                                aria-describedby="transition-modal-description"
                                                open={openfollowers}
                                                style={{ maxWidth: '50%', margin: 'auto' }}
                                                closeAfterTransition
                                                slots={{ backdrop: Backdrop }}
                                                slotProps={{
                                                    backdrop: {
                                                        timeout: 500,
                                                    },
                                                }}

                                            >
                                                <Fade in={openfollowers}>
                                                    <Box className="modal-abonnement">
                                                        <div className='modal-abonnement-titre'>
                                                            <h2 className='modal-title'>Abonnés</h2>
                                                            <div className="exit-button" onClick={handleClosefollowers}>X</div>
                                                        </div>
                                                        <BarSearch function={handleSearchfollowers} />
                                                        <div className='liste-abo'>
                                                            {liste_followers.map((follows, index) => (
                                                                <Abonnement key={index} {...follows} follow={follow} followOrfollowers={followOrfollowers} user={user} />))}
                                                        </div>
                                                    </Box>
                                                </Fade>
                                            </Modal>
                                            < div className='nb-abonnes'>{user.nb_followers}</div>
                                        </div>
                                    </div>
                                    <div className='bio'>
                                        {searched_user.bio}
                                    </div>
                                </div>
                            </section>
                            <section className='flux-profil'>
                                <div className='navigation-button'>
                                    <button onClick={() => { setAffichage("tweet"); setTweetActive(true); setRtActive(false); setLikesActive(false); }} className={`nav-profile-button ${tweetActive ? 'active' : ''}`}>Tweet</button>
                                    <button onClick={() => { setAffichage("rt"); setTweetActive(false); setRtActive(true); setLikesActive(false); }} className={`nav-profile-button ${rtActive ? 'active' : ''}`}>Retweet</button>
                                    <button onClick={() => { setAffichage("likes"); setTweetActive(false); setRtActive(false); setLikesActive(true); }} className={`nav-profile-button ${likesActive ? 'active' : ''}`}>Likes</button>
                                </div>

                                {listetwist.map((comment, index) => (
                                    <Tweet key={index} {...comment} user={user} affichage={affichage} />
                                ))}
                            </section>
                        </div>
                        <div className="right-pane">
                            <LeftSideBar user={user} />
                        </div>
                    </section >
                </div >
            </div >
        )
    }
    else {
        if (block || searched_user.pseudo === "user not found") {
            return (<div className='SectionMain' style={{ overflow: 'auto' }}>
                <section className='header'>
                    <Header user={user} />
                </section>
                <section className='corpschild'>
                    <div className="left-pane">
                        <SideBar user={user} />
                    </div>
                    <div className="main-pane">
                        <section className="main-pane-profile">
                            <div className='profile-setting'>
                                <div className='icone-back'>
                                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                                </div>
                                <div className='titre_section'>
                                    <h1 className='settings-titre'>{username}</h1>
                                </div>
                            </div>
                            <div className='background-picture'>
                                <img src="https://previews.123rf.com/images/imagecatalogue/imagecatalogue1611/imagecatalogue161115996/66632914-texte-non-trouv%C3%A9-joint-en-caoutchouc-tampon-de-timbre-l%C3%A9gende-%C3%A0-l-int%C3%A9rieur-d-une-banni%C3%A8re.jpg" className='image_de_fond' alt="pp-back" />
                            </div>
                            <div className='pp-section'>
                                <div class="avatar-container">
                                    <img src="https://pbs.twimg.com/profile_images/1321030814436655106/87OcbZNm_400x400.jpg" alt="avatar" className="tweet-img" />
                                </div>
                            </div>
                            <div className='info-profile'>
                                <section className="container-usernanme">
                                    <div className='info-username'>
                                        <h1 className='name-prenom'>not found</h1>
                                        <h2 className='username'>@not found</h2>
                                    </div>
                                </section>
                                <div className='abonne'>
                                    <div className='abonnement' >
                                        <div >Abonnements</div>
                                        <div className='nb-abonnement'></div>
                                    </div>
                                    <div className={"abonnes"}>
                                        <div >Abonnés</div>
                                        < div className='nb-abonnes'></div>
                                    </div>
                                </div>
                                <div className='bio'>
                                </div>
                            </div>
                        </section>
                        <section className='flux-profil'>
                            <div className='private-account'>
                                <h1>Utilisateur introuvable.</h1>
                            </div>
                        </section>
                    </div>
                    <div className="right-pane">
                        <LeftSideBar user={user} />
                    </div>
                </section >

            </div >)
        }
        else {
            if (!searched_user.private) {
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
                                <section className="main-pane-profile">
                                    <div className='profile-setting'>
                                        <div className='icone-back'>
                                            <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                                        </div>
                                        <div className='titre_section'>
                                            <h1 className='settings-titre'>{username}</h1>
                                        </div>
                                    </div>
                                    <div className='background-picture'>
                                        <img src={selectedFile} className='image_de_fond' alt="pp-back" />
                                    </div>
                                    <div className='pp-section'>
                                        <div class="avatar-container">
                                            <img src={selectedPp} alt="avatar" className="tweet-img" />
                                        </div>
                                    </div>
                                    <div className='info-profile'>
                                        <section className="container-usernanme">
                                            <div className='info-username'>
                                                <h1 className='name-prenom'>{searched_user.nom} {searched_user.prenom}</h1>
                                                <h2 className='username'>@{searched_user.pseudo}</h2>
                                            </div>
                                            <div className='config-button'>
                                                {(!follow && <button className='add-btn' onClick={handleFollow}>Follow</button>) || (<button className='add-btn' onClick={handleUnfollow}>Following</button>)}

                                                <button className="config-btn" onClick={handleDiscussion}><FontAwesomeIcon className='icon-edit' icon={faPaperPlane} /></button>
                                                <button className="config-btn" onClick={handleBlock}><FontAwesomeIcon className='icon-edit' icon={faBan} /></button>
                                            </div>

                                        </section>
                                        <div className='abonne'>
                                            <div className='abonnement' >
                                                <div onClick={handleOpenfollow}>Abonnements</div>
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    open={openfollow}
                                                    style={{ maxWidth: '50%', margin: 'auto' }}
                                                    closeAfterTransition
                                                    slots={{ backdrop: Backdrop }}
                                                    slotProps={{
                                                        backdrop: {
                                                            timeout: 500,
                                                        },
                                                    }}

                                                >
                                                    <Fade in={openfollow}>
                                                        <Box className="modal-abonnement">
                                                            <div className='modal-abonnement-titre'>
                                                                <h2 className='modal-title'>Abonnement</h2>
                                                                <div className="exit-button" onClick={handleClosefollow}>X</div>
                                                            </div>
                                                            <BarSearch function={handleSearchfollow} />
                                                            <div className='liste-abo'>
                                                                {liste_follows.map((follows, index) => (
                                                                    <Abonnement key={index} {...follows} follow={follow} followOrfollowers={followOrfollowers} user={user} />))}
                                                            </div>
                                                        </Box>
                                                    </Fade>
                                                </Modal>
                                                <div className='nb-abonnement'>{searched_user.nb_follow}</div>
                                            </div>
                                            <div className={"abonnes"}>
                                                <div onClick={handleOpenfollowers}>Abonnés</div>
                                                <Modal
                                                    aria-labelledby="transition-modal-title"
                                                    aria-describedby="transition-modal-description"
                                                    open={openfollowers}
                                                    style={{ minWidth: '50%', maxWidth: '50%', margin: 'auto' }}
                                                    closeAfterTransition
                                                    slots={{ backdrop: Backdrop }}
                                                    slotProps={{
                                                        backdrop: {
                                                            timeout: 500,
                                                        },
                                                    }}

                                                >
                                                    <Fade in={openfollowers}>
                                                        <Box className="modal-abonnement">
                                                            <div className='modal-abonnement-titre'>
                                                                <h2 className='modal-title'>Abonnés</h2>
                                                                <div className="exit-button" onClick={handleClosefollowers}>X</div>
                                                            </div>
                                                            <BarSearch function={handleSearchfollowers} />
                                                            <div className='liste-abo'>
                                                                {liste_followers.map((follows, index) => (
                                                                    <Abonnement key={index} {...follows} follow={follow} followOrfollowers={followOrfollowers} user={user} />))}
                                                            </div>
                                                        </Box>
                                                    </Fade>
                                                </Modal>
                                                < div className='nb-abonnes'>{searched_user.nb_followers}</div>
                                            </div>
                                        </div>
                                        <div className='bio'>
                                            {searched_user.bio}
                                        </div>
                                    </div>
                                </section>
                                <section className='flux-profil'>
                                    <div className='navigation-button'>
                                        <button onClick={() => { setAffichage("tweet"); setTweetActive(true); setRtActive(false); setLikesActive(false); }} className={`nav-profile-button ${tweetActive ? 'active' : ''}`}>Tweet</button>
                                        <button onClick={() => { setAffichage("rt"); setTweetActive(false); setRtActive(true); setLikesActive(false); }} className={`nav-profile-button ${rtActive ? 'active' : ''}`}>Retweet</button>
                                        <button onClick={() => { setAffichage("likes"); setTweetActive(false); setRtActive(false); setLikesActive(true); }} className={`nav-profile-button ${likesActive ? 'active' : ''}`}>Likes</button>
                                    </div>

                                    {listetwist.map((comment, index) => (
                                        <Tweet key={index} {...comment} user={user} affichage={affichage} />
                                    ))}
                                </section>
                            </div>
                            <div className="right-pane">
                                <LeftSideBar user={user} />
                            </div>
                        </section >

                    </div >
                )
            }
            else {
                return (<div className='SectionMain' style={{ overflow: 'auto' }}>
                    <section className='header'>
                        <Header user={user} />
                    </section>
                    <section className='corpschild'>
                        <div className="left-pane">
                            <SideBar user={user} />
                        </div>
                        <div className="main-pane">
                            <section className="main-pane-profile">
                                <div className='profile-setting'>
                                    <div className='icone-back'>
                                        <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                                    </div>
                                    <div className='titre_section'>
                                        <h1 className='settings-titre'>{username}</h1>
                                    </div>
                                </div>
                                <div className='background-picture'>
                                    <img src={selectedFile} className='image_de_fond' alt="pp-back" />
                                </div>
                                <div className='pp-section'>
                                    <div class="avatar-container">
                                        <img src={selectedPp} alt="avatar" className="tweet-img" />
                                    </div>
                                </div>
                                <div className='info-profile'>
                                    <section className="container-usernanme">
                                        <div className='info-username'>
                                            <h1 className='name-prenom'>{searched_user.nom} {searched_user.prenom}</h1>
                                            <h2 className='username'>@{searched_user.pseudo}</h2>
                                        </div>
                                        <div className='config-button'>
                                            {(!asked && <button className='add-btn' onClick={handleFollow}>Follow</button>) || (<button className='add-btn' onClick={handleUnasked}>Requested</button>)}
                                            <button className="config-btn" onClick={handleBlock}><FontAwesomeIcon className='icon-edit' icon={faBan} /></button>
                                        </div>
                                    </section>
                                    <div className='abonne'>
                                        <div className='abonnement'>
                                            Abonnements
                                            <div className='nb-abonnement'>{searched_user.nb_follow}</div>
                                        </div>
                                        <div className='abonnes'>
                                            Abonnés
                                            <div className='nb-abonnes'>{searched_user.nb_followers}</div>
                                        </div>
                                    </div>
                                    <div className='bio'>
                                        {searched_user.bio}
                                    </div>
                                </div>
                            </section>
                            <section className='flux-profil'>
                                <div className='private-account'>
                                    <h1>Ce compte est privé.</h1>
                                </div>
                            </section>
                        </div>
                        <div className="right-pane">
                            <LeftSideBar user={user} />
                        </div>
                    </section >

                </div >)
            }
        }
    }
}

export default Profil;