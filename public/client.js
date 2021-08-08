const socket = io();
let name;
let textarea = document.querySelector("#textarea");
let messageArea = document.querySelector(".message__area");

//getting user name
do {
  name = prompt("Please enter your name: ");
} while (!name);

//getting text input from the user

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

//creating sendmessage function
function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };
  // Append
  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();
  //emit response by socket from client----> sending server
  socket.emit("message", msg);
}

//append all the message in messaging area and showing this in html file shown by server
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);
}

//recieving messages in user end(client end)

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

//for scrolling down to bottom
function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
