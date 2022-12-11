const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function(){
    console.log("click!");

    socket.emit('chat:message', {
        message: message.value,
        username: username.value
    })

});

message.addEventListener('keypress', function(){

    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', function(data){

    console.log(data);
    output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
    </p>`
});

socket.on('chat:typing', function(data){

    output.innerHTML += `<p><em>
    <strong>${data}</strong>esta escribiendo ... ${data.message}
    </em></p>`
});
