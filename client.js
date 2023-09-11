const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', (data) => {
  if (data.name !== name && data.name!="") {
    append(`${data.name}: ${data.message}`, 'left');
  }
});

socket.on('left', (name) => {
  append(`${name} left the chat`, 'right');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim(); // Trim any leading/trailing whitespace

  if (message !== '') {
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
  }
});

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
  messageElement.classList.add(position);
  messageContainer.append(messageElement);

  messageContainer.scrollTop = messageContainer.scrollHeight;
};





/*const socket = io();

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// var audio = new Audio('ting.mp3');

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message');
    messageElement.classList.add(position);
    
     // Check if the message is sent by the current user
  const senderName = message.split(':')[0].trim();
  if (position === 'right' && senderName === name) {
    return;
  }
  messageContainer.append(messageElement);

  // if (position == 'left') {
  //   audio.play();
  // }
};

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', (data) => {
  append(`${data.name}: ${data.message}`, 'left');
});


socket.on('left', (name) => {
  append(`${name} left the chat`, 'right');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim(); // Trim any leading/trailing whitespace

  if (message !== '') {
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
  }
});
*/

///third 

/*socket.on('send', (message) => {
  // Append the received message to the chat container
  append(message, 'left');
});*/




/*const socket = io();

const form = document.getElementById('send-conatiner');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

// var audio = new Audio('ting.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if (position == 'left') {
        audio.play();
    }
}






const name = prompt("enter your name to join");
socket.emit('new-user-joined', name);

//if a user join
socket.on('user-joined', name => {
    append(`${name} joined the chat`,'right')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name => {
    append(`${name} left the chat`,'right')
})


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim(); // Trim any leading/trailing whitespace
    
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';
    
});*/

/*socket.on('send', (message) => {
    const li = document.createElement('li');
    li.innerText = message;
    messagesList.appendChild(li);
    messagesList.scrollTop = messagesList.scrollHeight;
  });
  */
