import React, { useEffect, useState } from 'react';
import MainPage from './components/MainPage/MainPage.js'
import Connexion from './components/Connexion/Connexion.js'
import Discussions from './components/Discussions/Discussions.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Inscription from './components/Inscription/Inscription.js';
import Profil from './components/Profil/Profil.js';
import axios from 'axios';
import Settings from './components/Settings/Settings.js';
import SearchResult from './components/SearchResult/SearchResult.js';
import FollowRequest from './components/request/Request.js';
import Saved from './components/Saved/Saved.js';
import Statistiques from './components/Statistiques/Statistiques.js';
import ChangePwd from './components/ChangePwd/ChangePwd.js';
import ChangePassword from './components/ChangePseudo/ChangePassword.js';
import TwistStat from './components/Statistiques/TwistStat.js';
import Blocked from './components/Blocked/Blocked.js';
import NotFound from './components/NotFound/NotFound.js';

function App() {
  const [user, setuser] = useState({"logged":true})
  const test_connect = async () => {
    await axios.get('http://localhost:4000/user/logged', { withCredentials: true })
      .then(response => {
        console.log(user)
        console.log(response.data)
        if(user.pseudo!==response.data.pseudo || user.logged!==response.data.logged){
          setuser(response.data)
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  useEffect(() => {
    test_connect();
  },[])
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/main" />} />
        <Route path="/main" element={<MainPage user={user} />} />
        <Route path="/connexion" element={<Connexion test_connect={test_connect} />} />
        <Route path="/inscription" element={<Inscription test_connect={test_connect}/>} />
        <Route path='/profil/:username' element={<Profil user={user} connect={test_connect} />} />
        <Route path="/discussions" element={<Discussions user={user} />} />
        <Route path="/settings/:username" element={<Settings user={user} test_connect={test_connect}/>} />
        <Route path="/request/:username" element={<FollowRequest user={user} />} />
        <Route path="/search" element={<SearchResult user={user} test_connect={test_connect}/>} />
        <Route path="/friend_request" element={<FollowRequest user={user} />} />
        <Route path="/saved" element={<Saved user={user} />} />
        <Route path="/statistiques" element={<Statistiques user={user} />} />
        <Route path="/statistiques/twist" element={<TwistStat user={user} />} />
        <Route path="/information/:username" element={<ChangePwd user={user} connect={test_connect} />} />
        <Route path="/setpassword/:username" element={<ChangePassword user={user} />} />
        <Route path="/blocked/:username" element={<Blocked user={user} />} />
        <Route path='*' element={<NotFound user={user} />} />
      </Routes>
    </Router>
  );
}


export default App;
