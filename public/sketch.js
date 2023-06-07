//var socket = new WebSocket('ip');

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
