const path=require('path')
const http=require('http')
const express=require('express')
const socketIO=require('socket.io')
const publicPath=path.join(__dirname,'/../public')
const port=process.env.PORT||3000
let app=express();
let server=http.createServer(app);
let io=socketIO(server)//socket io library
app.use(express.static(publicPath))

io.on('connection',(socket)=>
{
    console.log("a new one")
    socket.on('disconnect',(socket)=>
    {
    console.log("disconnect the one")
    })
})


server.listen(port,()=>
{

})