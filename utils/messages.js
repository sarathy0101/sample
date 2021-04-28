const moment=require('moment')
const messages=[]
function formatMessage(userName,messageContent)
{
    let date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;

    return {
        userName,messageContent,time:strTime
    }
}

function addMessages(roomId,messageContent)
{
    const message={roomId,messageContent}
    messages.push(message)
}

function oldMessages(roomId)
{
    return messages.filter((message)=>message.roomId==roomId)
}

module.exports={formatMessage,addMessages,oldMessages}