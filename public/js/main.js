//const axios = require('axios').default;
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});
const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);
});

// Message from server
socket.on('message', (message) => {
    // console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    let msg = e.target.elements.msg.value;
    //   console.log(msg);

    if (msg[0] === '/') {
        if (msg.includes('/weather')) {
            getWeather(msg)
            // console.log()
        }
    }
    else {

        socket.emit('chatMessage', msg,)
    }

    msg = msg.trim();

    if (!msg) {
        return false;
    }

    // Emit message to server
    //socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

const getWeather = (command) => {
    if (command.includes(":")) {
        const city = command.split(':').pop() ?? 'Kuressaare'
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=eaa1a3643e0bea74c9def77a7761c7c3&units=metric`).then(res => {
            if (!res.ok) {
                socket.emit('chatMessage', msg.value + 'wrong city name')
            }
            //console.log(res.json())
            return res.json()
            //return res.json()
        }).then(data => socket.emit('chatMessage', data.main.temp + " ℃ " + city))


        // if (city === ) {
        //     socket.emit('chatmessage', msg + "error",)
        // }
    }
}

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.style.color = "#5CDB95";
    div.style.fontSize = "16px";
    div.style.fontFamily = "Open Sans";
    div.style.border = "solid"
    div.style.borderRadius = "15px"
    div.style.padding = "10px"
    div.style.marginTop = "1rem"
    const p = document.createElement('p');
    p.classList.add('meta');
    p.style.color = "#5CDB95";
    p.innerText = message.username;
    p.innerHTML += `<span style="color:rgb(220 38 38); padding-left: 5px; font-weight: normal; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${message.time}</span>`;
    div.appendChild(p);
    const para = document.createElement('p');
    para.classList.add('text');
    para.style.color = "#EDF5E1"
    para.style.fontWeight = "bold"
    para.innerText = message.text;
    div.appendChild(para);
    document.querySelector('.chat-messages').appendChild(div);
}


// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = '';
    users.forEach((user) => {
        const li = document.createElement('li');
        li.innerText = user.username;
        userList.appendChild(li);
    });
}

//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
        window.location = '../index.html';
    } else {
    }
});
