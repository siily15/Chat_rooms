const ChatForm = documnet.getElemantById('chat-form');

const socket = io();


socket.on('message', message => {
    console.log(message)
});

// Message submit
ChatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elemants.msg.value;

    //Emit message to server
    socket.emit('chatMessage', msg)
});
