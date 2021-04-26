const path=require('path')
const http=require('http')
const express=require('express')
const socketIO=require('socket.io')
const {formatMessage}=require('../utils/messages.js')
const publicPath=path.join(__dirname,'/../public')
const port=process.env.PORT||3000
let app=express();
let server=http.createServer(app);
let io=socketIO(server)//socket io library
app.use(express.static(publicPath))

io.on('connection',(socket)=>
{
    socket.emit('message',formatMessage('FunChat Bot','welcome to chat'))
    socket.broadcast.emit('message',formatMessage('FunChat Bot','A new user connected'))
    socket.on('disconnect',(socket)=>
    {
        io.emit('message',formatMessage('FunChat Bot','user disconnected'))
    })
    socket.on('chatMessage',(message)=>
    {
        io.emit('message',formatMessage('FunChat Bot',message))
    })
})


server.listen(port,()=>
{

})