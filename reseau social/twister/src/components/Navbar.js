import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const liste = (<ul className='list'>
        <button class="item" id="btn_conn" onClick={() => navigate('/connexion')}>Connexion</button>
        <button class="item" id="btn_insc" onClick={() => navigate('/inscription')}>Inscription</button>
        <button class="item" id="btn_search">Search</button>
    </ul>);
    const menunavtrue = () => {
        setMenu(true);
    }

    const menunavfalse = () => {
        setMenu(false);
    }
    useEffect(() => {
        const elemmenu = document.getElementById("btn_menu");
        elemmenu.addEventListener("mouseenter", menunavtrue);

    }, []);
    useEffect(() => {
        const elemmenu2 = document.getElementById("nav");
        elemmenu2.addEventListener("mouseleave", menunavfalse);
    }, []);


    return (
        <div className="nav" id="nav">
            <button className='navbutton' id="btn_menu">Menu</button>
            <nav className='menu'>
                {menu && liste}
            </nav>

        </div>
    )


}

export default Navbar;