const chatForm=document.getElementById('chat-form')
const chatMessage=document.querySelector('#chat-messages')
let socket=io()
socket.on('message',(message)=>
{
    
    displayMessage(message)
    chatMessage.scrollTop=chatMessage.scrollHeight
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
    divForMessage.innerHTML=`<p class="chat-content" style="word-wrap:break-word">${message}</p>`
    document.querySelector('#chat-messages').appendChild(divForMessage)

}