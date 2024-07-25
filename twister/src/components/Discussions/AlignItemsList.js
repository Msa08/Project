import React,{useEffect, useState} from "react";
import axios from "axios";
import './alignitemslist.css';


function AlignItemsList(props) {

    const {user, message} = props;
    const [selectedPp, setselectedPp] = useState("https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745");
    useEffect(()=>{
            axios.get('http://localhost:4000/user/pp/'+user,{responseType:'blob',withCredentials:true}) // Remplacez par le nom de fichier réel de l'image téléchargée
                .then(res => {
                    if(res.data){
                        if(res.data){
                            console.log(res.data)
                            const url = URL.createObjectURL(res.data);
                            setselectedPp(url)
                        }
                    }
                })
    },[])

    return (
        <div className="container-listitem">
            <div className="list-item">
                <div className="list-item-avatar">
                    <img className='avatarss' src={selectedPp} alt="Remy Sharp" />
                </div>
                <div className="list-item-text">
                    <div className="list-item-primary-text">{user}</div>
                    <div className="list-item-secondary-text">
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default AlignItemsList;
