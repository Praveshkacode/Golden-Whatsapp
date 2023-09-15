const socket = io('http://localhost:8000');

// Get dom elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp')
const messageCotainer = document.querySelector(".container")

// audio play on receive messages
var audio = new Audio('ting.mp3');

// fuctions which will append event info to the container
const append=(message,position)=>{
    const messageElement= document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageCotainer.append(messageElement);
    if(position=='left'){
        audio.play();
    }
}


// ask new user name and let the server know
const name = prompt("Enter your name to join");
if(name){
socket.emit('new-user-joined', name);
// If a new user joins, receive his/her name from the server
socket.on('user-joined',name =>{
    append(`${name} join the chat`,'right')
})

// if server sends a message, receive it
socket.on('receive',data =>{
    append(`${data.name}:${data.message}`,'left')
})

// If a user leave the chat , append info to the container
socket.on('left ',name =>{
    append(`${name} left the chat`,'right')

})

// if the form gets submitted , send message to the server

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message =messageInput.value;
    append(`you:${message}`,'right')
    socket.emit('send',message);
    messageInput.value =" ";

})

}



