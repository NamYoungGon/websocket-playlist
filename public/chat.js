// Make Connection
var socket = io.connect('http://localhost:4000');

//  Query DOM
var message     = document.getElementById('message'),
    nickname    = document.getElementById('nickname'),
    btn         = document.getElementById('send'),
    output      = document.getElementById('output'),
    feedback    = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function () {
    socket.emit('chat', {
        nickname: nickname.value,
        message: message.value
    });
});

message.addEventListener('keyup', function () {
    socket.emit('typing', {
        nickname: nickname.value,
        message: message.value
    });
});

// Listen for events
socket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.nickname + ' : </strong>' + data.message + '</p>';
});

socket.on('typing', function (data) {
    if (data.message)
        feedback.innerHTML = '<p><em>' + data.nickname + ' is typing a message...</em></p>';
    else 
        feedback.innerHTML = '';
});