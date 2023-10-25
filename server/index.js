const express=require('express');
const cors=require('cors');
const {Server}=require('socket.io');
const app=express();
app.use(cors());
app.use(express.json());
const server=app.listen(8000,()=>{
    console.log('Server is running on port 8000')
})
const io=new Server(server,{
    cors:{
        origin:'*'
    }
})
io.on('connection',(socket)=>{
    console.log(`User connected ${socket.id}`);
    socket.on('join_room',(data)=>{
        console.log(`User joined room : ${data.room} `)
        socket.join(data.room);
    })
    socket.on('send_msg',(data)=>{
        socket.to(data.room).emit('receive_msg',data)
    });
    socket.on('typing',(data)=>{
        socket.to(data.room).emit('typing',data.name)
    })

    socket.on('disconnect',()=>{
        console.log('User disconnected!')
    })
})