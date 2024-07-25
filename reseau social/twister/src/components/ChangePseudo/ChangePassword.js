import React, { useState, useEffect } from 'react';
import SideBar from '../MainPage/SideBar';
import Header from '../Header';
import LeftSideBar from '../MainPage/LeftSideBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './changepassword.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function ChangePassword(props) {
  const navigate = useNavigate();
  const user = props.user;
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error1, setError1] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = [];
    if (!currentPassword || !newPassword || !confirmPassword) {
      errors.push('Remplissez tous les champs');
      setSuccessMsg('')
    }
    else{
      if (newPassword !== confirmPassword) {
        errors.push('Les deux saisies ne sont pas identique');
        setSuccessMsg('')
      }
    }
      /*Ecrire la requete correspondante à la modification du mot de passe, comprenant la verification du mdp*/
      await axios.post('http://localhost:4000/user/checkpassword', {password:currentPassword},{withCredentials:true})
      .then(res=>{
          console.log("yo")
          
      })
      .catch(error=>{
        console.log("yo")
        setSuccessMsg('')
        errors.push('Mot de passe incorrect')
      })
    if (errors.length === 0) {
        setError('');
        setError1('');
      await axios.post('http://localhost:4000/user/setpassword', {
                password:newPassword
            }, { withCredentials: true })
                .then(res => {
                    setSuccessMsg("Les modifications ont été enregistrées avec succès !");
                });
      // Envoyer la demande de changement de mot de passe ici
      //Et en fonction de la reponse on définit ou non une erreur de mdp incorrecte
    } else {
      setError(errors.join(' '));
    }
  };

  useEffect(() => {
    console.log(user)
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
        <div className='left-pane'>
          <SideBar user={user} />
        </div>
        <div className='main-pane'>
          <div className='saved-settings'>
            <div className='icone-back'>
              <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
            </div>
            <div className='titre_section'>
              <h1 className='settings-titre'>Modifier mot de passe</h1>
            </div>
          </div>
          <div className='password-change'>
            <div className={`inputs ${(error || error1) && !currentPassword ? 'error' : ''}`}>
              <input type='password' id='current-password' required value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
              <label htmlFor='current-password'> Mot de passe actuel</label>
            </div>
            <div className={`inputs ${(error || error1) && !newPassword ? 'error' : ''}`}>
              <input type='password' id='new-password' required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
              <label htmlFor='new-password'> Nouveau mot de passe</label>
            </div>
            <div className={`inputs ${(error || error1) && !confirmPassword ? 'error' : ''}`}>
              <input type='password' id='confirm-password' required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <label htmlFor='confirm-password'> Confirmer nouveau mot de passe</label>
            </div>
            {successMsg && <div className='error-message' style={{ color: "green" }}>{successMsg}</div>}
            {error && <div className='error-message' style={{ color: "red" }}>{error}</div>}
          </div>

          <button className='btn-confirm' onClick={handleSubmit}>Confirmer</button>
        </div>
        <div className='right-pane'>
          <LeftSideBar user={user} />
        </div>
      </section>
    </div>
  );
}


export default ChangePassword;