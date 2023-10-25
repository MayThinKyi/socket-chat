import React, { useState } from 'react'
import io from 'socket.io-client'
import Chat from './components/Chat';
import JoinChat from './components/JoinChat';
const socket=io.connect('http://localhost:8000')
const App = () => {
  const [loggedIn,setLoggedIn]=useState(false);
  const [userInfo,setUserInfo]=useState({
    name:'',room:''
  })
  const userInfoHandler=(e)=>{
    setUserInfo({...userInfo,[e.target.id]:e.target.value})
  }
  return (
    <div>
      {loggedIn ? <Chat socket={socket} userInfo={userInfo} /> 
      :
       <JoinChat setLoggedIn={setLoggedIn} socket={socket} userInfo={userInfo} userInfoHandler={userInfoHandler} />}
    </div>
  )
}

export default App
