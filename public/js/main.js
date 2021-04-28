//console.log(QueryString.parse(qs));
const chatForm=document.getElementById('chat-form')
const chatMessage=document.querySelector('#chat-messages')

//const {username,roomid}=urlParser(location.search)
let url=location.search
url=url.split('&')
let userName=url[0].split('?name=')[1].replace('+'," ")
let roomId=url[1].split('id=')[1]

let socket=io()
socket.emit('userName',{userName,roomId})
socket.on('message',(message)=>
{
    displayMessage(message)
    chatMessage.scrollTop=chatMessage.scrollHeight
})
socket.on('old messages',(messages)=>
{
    messages.forEach(message=> {
        displayMessage(message.messageContent)
    });
})
socket.on('current online users',({room,users})=>
{
    displayUsers(users)
    displayRoom(room)
})

chatForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const msg=chatBox.chat.value
    socket.emit('chatMessage',msg)
    chatBox.chat.value=''
})
function displayMessage(message)
{
    const divForMessage=document.createElement('div')
    divForMessage.classList.add('message')
    divForMessage.innerHTML=`<p>${message.userName} <span class="chat-time">${message.time}</span></p>
    <br/>
    <p class="chat-content">${message.messageContent}</p>`
    document.querySelector('#chat-messages').appendChild(divForMessage)

}
function displayRoom(room)
{
    //document.getElementsByClassName('room-id').innerText+=room
    document.getElementById('room-id').innerText=room
    
}

function displayUsers(users)
{
    document.getElementById('online-users').innerHTML=users.map(user=>`<li>${user.userName}</li>`).join('')
}