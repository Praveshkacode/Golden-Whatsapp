// node server which will handle socket io connections
const io = require('socket.io')(8000)
const users ={};

io.on('connection',socket =>{
    // if any new user join , tbb sbb ko bata do
    socket.on('new-user-joined',name=>{
        // console.log("New user",name);
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    // if someone sends the message broadcast to other people
    socket.on('send',message=>{
        socket.broadcast.emit('receive', {message: message,name: users[socket.id]})
    });

    // if someone leaves the chat tbb sbko bata do
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });

})

