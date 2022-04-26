const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');


// Get username and room form URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// Join chatroom
Socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message from server
socket.on('message', message => {
    console.log(message)
    outoutMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
ChatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elemants.msg.value;

    //Emit message to server
    socket.emit('chatMessage', msg)

    //Clear inputs
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message) {
    const div = document.createElemant('div');
    div.callsList.add(message);
    div.innerHTML = ``;
};

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}


// Add users to DOM
function outputUsers(users) { }
