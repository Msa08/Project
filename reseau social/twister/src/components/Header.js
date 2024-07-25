import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './header.css'


function Header(props) {

    const navigate = useNavigate();
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [open, setOpen] = useState(false);
    const user = props.user

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleDisconnect = (event) => {
        event.preventDefault();
        console.log("Deconnexion reussis")
        axios.get('http://localhost:4000/user/logout', { withCredentials: true })
            .then(response => {
                localStorage.setItem("deconnexionReussie", true);
                console.log(response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
        navigate('/')
    }

    useEffect(() => {
        if (localStorage.getItem("deconnexionReussie")) {
            setOpen(true);
            localStorage.removeItem("deconnexionReussie");
        }
    }, []);

    if (!user.logged) {
        return (
            <header>
                <a href="/main"><img className="logo" alt="logo"src="../logo192.png" width="100" height="100" /></a>
                <h1>Twister</h1>
                <div className='btn-container'>
                    <button className="item" id="btn_conn" onClick={() => navigate('/connexion')}>Connexion</button>
                    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Deconnexion Réussie !
                        </Alert>
                    </Snackbar>
                </div>
            </header>
        );
    }
    else {
        return (
            <header>
                <a href="/main"><img className="logo" alt="logo"src="../logo192.png" width="100" height="100" /></a>
                <h1>Twister</h1>
                <div className='btn-container'>
                    <button onClick={handleDisconnect}>Deconnexion</button>
                </div>
            </header>
        );
    }
}
export default Header;
