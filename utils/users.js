users=[]
function addUser(id,userName,roomId)
{
    const user={id,userName,roomId}
    users.push(user)
    return user;
}

function currentUser(id)
{
    return users.find(user=>user.id===id)
}

function exitUser(id)
{
    const index= users.findIndex(user=>user.id===id)
    if(index!=-1)
    {
        users.splice(index,1)
    }
}
function getUsersInRoom(roomId)
{
    return users.filter(user=>user.roomId===roomId)
}
module.exports={addUser,currentUser,exitUser,getUsersInRoom}