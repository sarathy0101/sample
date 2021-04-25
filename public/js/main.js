const chatForm=document.getElementById('chat-form')
let socket=io()
socket.on('message',(message)=>
{
    console.log(message)
    displayMessage(message)
})
chatForm.addEventListener('submit',(e)=>
{
    e.preventDefault();
    const msg=chatBox.chat.value
    socket.emit('chatMessage',msg)
})
function displayMessage(message)
{
    const divForMessage=document.createElement('div')
    divForMessage.classList.add('message')
    divForMessage.innerHTML=`<p class="chat-content">${message}</p>`
    document.querySelector('#chat-messages').appendChild(divForMessage)

}