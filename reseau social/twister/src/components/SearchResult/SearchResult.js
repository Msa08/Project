import React from 'react';
import "./searchResult.css"
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import Header from "../Header";
import SideBar from "../MainPage/SideBar";
import LeftSideBar from "../MainPage/LeftSideBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Tweet } from '../commentaire/Commentaire';
import axios from 'axios';

function User(props) {
    const { pseudo } = props
    const navigate = useNavigate();
    const [isFollow, setisFollow] = useState(false)
    const [isAsked, setAsked] = useState(false)
    const [selectedPp, setselectedPp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");
    useEffect(() => {
        axios.get('http://localhost:4000/user/isfollow/' + pseudo, { withCredentials: true })
            .then(response => {
                setisFollow(response.data.follow);
                console.log(response.data.follow)
                if (!response.data.follow) {
                    axios.get('http://localhost:4000/user/isAsked/' + pseudo, { withCredentials: true })
                        .then(response => {
                            setAsked(response.data.asked);
                        })
                }
            })


    }, [isFollow])
    useEffect(() => {
        axios.get('http://localhost:4000/user/pp/'+pseudo,{responseType:'blob',withCredentials:true}) // Remplacez par le nom de fichier réel de l'image téléchargée
            .then(res => {
                if(res.data){
                    if(res.data){
                        const url = URL.createObjectURL(res.data);
                        setselectedPp(url)
                    }

                }
            })
    }, [])
    const handleFollow = () => {
        axios.post('http://localhost:4000/user/follow/' + pseudo, {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setisFollow(true);
                }
                if (response.status === 205) {
                    setAsked(true)
                }
            })

    }

    const handleUnfollow = () => {
        console.log("unfollow")
        axios.delete('http://localhost:4000/user/unfollow/' + pseudo, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setisFollow(false);
                }
            })
    }

    const handleUnasked = () => {
        axios.delete('http://localhost:4000/user/unasked/' + pseudo, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setAsked(false);
                }
            })
    }

    const nav_profil = () => {
        navigate("/profil/" + pseudo)
    }

    return (
        <section className='partie-abonnement' style={{ cursor: 'pointer' }}>
            <div className='pp-abonnement' onClick={() => nav_profil()}>
                <img src={selectedPp} className="pdp-abonnement" alt="pp-back" />
            </div>
            <div className='nom-abonnement'>
                {pseudo}
            </div>
            <div className='unfollow-tac'>
                {
                    (((!isFollow && ((!isAsked && <button className='add-btn' onClick={() => handleFollow()}>Follow</button>) || (<button className='add-btn' onClick={() => handleUnasked()}>Requested</button>))))
                        || (<button className='add-btn' onClick={() => handleUnfollow()}>Following</button>))
                }
            </div>
        </section>
    );
}

function SearchResult(props) {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const category = searchParams.get('category')
    // Utilisez query pour effectuer la recherche et afficher les résultats
    const [results, setresult] = useState([]); // exemple de résultats de recherche
    const user = props.user
    const [quer, setQuery] = useState("");
    const [cate, setCategory] = useState("Twist");
    const [recherche,setrecherche] = useState("")
    function SelectSmall() {

        return (
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Catégorie</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={cate}
                    label="category"
                    onChange={(event)=>setCategory(event.target.value)}
                >
                    <MenuItem value={"Twist"}>Twist</MenuItem>
                    <MenuItem value={"Recent"}>Latest</MenuItem>
                    <MenuItem value={"User"}>User</MenuItem>
                    <MenuItem value={"Theme"}>#</MenuItem>
                </Select>
            </FormControl>
        );
    }

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        console.log(`Recherche: ${query}`);
        navigate('/search?category=' + cate + '&q=' + quer);
    };


    const navigate = useNavigate();

    const download = async() =>{
        if (category === "Twist") {
            await axios.post("http://localhost:4000/search/top_twist", { research: query }, { withCredentials: true })
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
                    setresult(tableau);
                })
                setrecherche("Twist");
        }
        if (category === "Recent") {
            await axios.post("http://localhost:4000/search/recent", { research: query }, { withCredentials: true })
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
                    setresult(tableau);
                })
                setrecherche("Recent");
        }
        if (category === "Theme") {
            await axios.post("http://localhost:4000/search/twistHashtagged", { research: query }, { withCredentials: true })
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
                    setresult(tableau);
                })
                setrecherche("Theme");
        }
        if (category === "User") {
            await axios.post("http://localhost:4000/search/user", { research: query }, { withCredentials: true })
                .then(response => {
                    setresult(response.data)
                })
            setrecherche("User");
        }
    }

    const handleBack = () => {
        navigate('/')
    }

    useEffect(() => {
        download();
    }, [query,category])

    useEffect(() => {
        props.test_connect();
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
                        <section className="main-pane-settings">
                            <div className='search-settings'>
                                <div className='icone-back'>
                                    <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
                                </div>
                                <div className='titre_section'>
                                    <h1 className='settings-titre'>Recherche</h1>
                                </div>
                            </div>
                            <div className="searching-pan">
                                <div className="barre-recherche">
                                    <form onSubmit={handleFormSubmit}>
                                        <div className="search-bar">
                                            <input
                                                className="search-input1"
                                                type="text"
                                                placeholder="Recherche Twister"
                                                value={quer}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="menu-categorie">
                                    <SelectSmall />
                                </div>
                                <div><button>Valider</button></div>
                            </div>
                            {/* Affichage des résultats de recherche ici */}
                            {recherche === "Twist" && results.map((comment, index) => (
                                <Tweet key={index} {...comment} user={user} />
                            ))}
                            {recherche === "Recent" && results.map((comment, index) => (
                                <Tweet key={index} {...comment} user={user} />
                            ))}
                            {recherche === "Theme" && results.map((comment, index) => (
                                <Tweet key={index} {...comment} user={user} />
                            ))}
                            {recherche === "User" && results.map((users, index) => (
                                <User key={index} {...users} user={user} />
                            ))}

                        </section>
                    </div>
                    <div className="right-pane">
                        <LeftSideBar />
                    </div>
                </section >
            </div >
            <section className='footcon'>
                <div class="gauche">
                    <span>Copyright © 2023 M&M Company Twister Sorbonne Université</span>
                </div>
                <div class="milieu">
                    <span> Twister </span>
                </div>
                <div class="droite">
                    <span> Sorbonne Université </span>
                </div>
            </section >
        </div>
    );
}

export default SearchResult;
