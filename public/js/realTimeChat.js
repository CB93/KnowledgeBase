const socket = io("http://localhost:5000");
const message = document.getElementById("message-input");
const sendBtn = document.getElementById("send-button");
let previousConversation;

socket.on("retrieve-private-message", (data) => {
    console.log(data);
});

startConversation = () => {
    const currentConversation = Math.floor(Math.random()*2);
    console.log(currentConversation)
    socket.emit("leave", `${previousConversation}`)
    socket.emit("join", `${currentConversation}`);
    previousConversation = currentConversation;
}

sendBtn.onclick = async (event) => {
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

    socket.emit("private-message", {room: `${previousConversation}`, message: messageValue});
    messageValue = null;

    return await response;
};
