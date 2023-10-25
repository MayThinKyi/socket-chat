import React, { useEffect, useState } from 'react'

import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({socket,userInfo}) => {
    const [message,setMessage]=useState('');
    const [messageList,setMessageList]=useState([]);
    const [isTyping,setIsTyping]=useState(false);
    const [typingUser,setTypingUser]=useState('');
    const sendMsgHandler=()=>{
        const msgInfo={
            msg:message,
            name:userInfo.name,
            room:userInfo.room,
            time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes()
        }
        socket.emit('send_msg',msgInfo)
        setMessageList((msgList)=>[...msgList,msgInfo])
        setMessage('')
    }
    const handleKeyPress=(e)=>{
      socket.emit('typing',userInfo)
    }
    useEffect(()=>{
        socket.on('receive_msg',(data)=>{
            setMessageList((msgList)=>[...msgList,data])
        })
        socket.on('typing',(data)=>{
          setTypingUser(data)
          setIsTyping(true);
          setTimeout(()=>setIsTyping(false),3000)

        })
    },[socket])
  return (
    <div className='my-20 flex flex-col border border-slate-400 rounded-lg items-center justify-center mx-auto h-content w-[350px]'>
      <h1 className='px-5 py-3 rounded-t-lg font-semibold w-full text-white text-lg bg-[#212C30]'>Live Chat 💬</h1>
        <ScrollToBottom className='h-[360px] w-full py-1 px-2 mx-2'>
      {messageList?.map((m,index)=>{
        return <div key={index} className={`  mb-4  flex flex-col mr-2 ${m?.name===userInfo?.name ? 'items-end':'items-start'} `}>
            <p className={`w-max rounded-lg py-3 px-4 text-white  ${m?.name===userInfo?.name ? 'bg-blue-600':'bg-green-600'} `}>{m?.msg}</p>
            <p className='text-[14px] font-[500]'>{m?.time} {m?.name}</p>
        </div>
      })}
            {isTyping && <p className='flex justify-start w-full p-2 text-[15px]'>{typingUser} is typing...</p>}

      </ScrollToBottom>
      <div className="flex items-center w-full m-0 border-t rounded-b-lg border-slate-400">
        <input  className='outline-none w-[80%] px-4 py-4  border-r border-slate-400'  placeholder='Message...' value={message} onChange={(e)=>setMessage(e.target.value)} onKeyPress={handleKeyPress} />
        <button className='px-4 py-4 mx-auto text-center' onClick={sendMsgHandler}> 🚀 </button>
      </div>
    </div>
  )
}

export default Chat
