const socket = io("http://localhost:5000");
const message = document.getElementById("message-input");
const sendBtn = document.getElementById("send-button");
let currentConversation;

socket.on("private-message-retrieval", (data) => {
    console.log(data);
});

startConversation = () => {
    const newConversation = Math.floor(Math.random()*2);
    console.log(newConversation)
    socket.emit("leave", `${currentConversation}`)
    socket.emit("join", `${newConversation}`);
    currentConversation = newConversation;
}

sendBtn.onclick = async (event) => {
    if (currentConversation == null) {
        alert("Select or start a conversation before messaging.");
        return;
    }

    event.preventDefault();
    let messageValue = message.value;

    const response = fetch("http://localhost:3000/message", {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({message: messageValue})
    });

    socket.emit("private-message", {room: `${currentConversation}`, message: messageValue});
    messageValue = null;

    return await response;
};
