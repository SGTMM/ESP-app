//var socket = new WebSocket('https://192.168.1.7:5000');

var socket = io()

var textbox = document.getElementsByClassName("textbox")[0]

var msg;

textbox.addEventListener("input", () => {
    if (textbox.value === "") {
        msg = " "
        console.log("empty message")
    } else {
        msg = textbox.value
    }
    socket.emit(msg)
})