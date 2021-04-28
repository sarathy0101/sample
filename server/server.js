const path=require('path')
const http=require('http')
const express=require('express')
const socketIO=require('socket.io')
const {formatMessage,addMessages,oldMessages}=require('../utils/messages.js')
const {addUser,currentUser,exitUser,getUsersInRoom}=require('../utils/users.js')
const publicPath=path.join(__dirname,'/../public')
const port=process.env.PORT||3000
let app=express();
let server=http.createServer(app);
let io=socketIO(server)//socket io library
app.use(express.static(publicPath))

io.on('connection',(socket)=>
{
    socket.on('userName',({userName,roomId})=>
    {
        const user=addUser(socket.id,userName,roomId)
        socket.join(roomId)
        this.userName=userName
        socket.emit('old messages',oldMessages(roomId))
        socket.emit('message',formatMessage('FunChat Bot','welcome to chat '+this.userName))
        socket.broadcast.to(roomId).emit('message',formatMessage('FunChat Bot','A new user - '+this.userName + ' connected'))
        addMessages(roomId,formatMessage('FunChat Bot','A new user - '+this.userName + ' connected'))
        io.to(roomId).emit('current online users',
        {
            room:roomId,users:getUsersInRoom(roomId)
        })
        

    })
    socket.on('disconnect',()=>
    {
        const user=currentUser(socket.id)
        exitUser(socket.id)
        if(user)
        {
        io.to(user.roomId).emit('message',formatMessage('FunChat Bot', user.userName +' disconnected!'))
        addMessages(user.roomId,formatMessage('FunChat Bot', user.userName +' disconnected!'))

        io.to(user.roomId).emit('current online users',
        {
            roomId:user.roomId,users:getUsersInRoom(user.roomId)
        })

        }
    
    })
    socket.on('chatMessage',(message)=>
    {
        const user=currentUser(socket.id);
        if(user)
        {
        io.to(user.roomId).emit('message',formatMessage(user.userName,message))
        addMessages(user.roomId,formatMessage(user.userName,message))
        }
    })
})


server.listen(port,()=>
{

})