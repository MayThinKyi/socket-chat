import React from 'react'

const JoinChat = ({socket,userInfo,userInfoHandler,setLoggedIn}) => {
    const joinChatHandler=()=>{
        socket.emit('join_room',userInfo)
        setLoggedIn(true)
    }
  return (
    <div className='w-max mx-auto flex flex-col items-center justify-center py-28'>
      <h1 className='text-4xl font-semibold mb-8'>Join A Chat</h1>
      <input className='input' id='name' value={userInfo.name} onChange={userInfoHandler} placeholder='Name....'/>
      <input   className='input' id='room' value={userInfo.room} onChange={userInfoHandler} placeholder='Room....'/>
    <button className='bg-[#2B8942] mt-4 text-[16px] uppercase w-full text-white py-4 text-center font-[500] rounded-lg' onClick={joinChatHandler}>Join Chat</button>
    </div>
  )
}

export default JoinChat
