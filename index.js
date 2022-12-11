const express = require('express');
const path = require('path');
const app = express();
const SocketIO = require('socket.io');


//setting
app.set('port', process.env.PORT || 3000);


//static file
app.use(express.static(path.join(__dirname, 'public')));


const server = app.listen(app.get('port'), ()=>{
    console.log("server on port ",app.get('port'));
});

const io = SocketIO(server);

//websocket
io.on('connection', (socket)=>{
    console.log("new conextion ", socket.id);

    socket.on('chat:message', (data)=>{
        console.log("datos recividos=>", data);
        io.sockets.emit('chat:message', data);

    });

    socket.on('chat:typing', (data)=>{
       socket.broadcast.emit('chat:typing', data);
     

    })

});

