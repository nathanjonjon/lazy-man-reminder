import { useAuthUser } from 'use-eazy-auth'
export default function Websocket() {
    const { token } = useAuthUser()
    var loc = window.location
    var wsStart = "ws://"
    if (loc.protocol === "https:") {
        wsStart = "wss://"
    }
    var webSocketEndpoint = `${wsStart}localhost:8000/notifications/?token=${token}`
    console.log(webSocketEndpoint);
    var socket = new WebSocket(webSocketEndpoint) // Creating a new Web Socket Connection
    // Socket On receive message Functionality
    socket.onmessage = function (e) {
        console.log('message', e)
        console.log(e.data)
        alert(e.data)
    }

    // Socket Connet Functionality
    socket.onopen = function (e) {
        console.log('open', e)
    }

    // Socket Error Functionality
    socket.onerror = function (e) {
        console.log('error', e)
    }

    // Socket close Functionality
    socket.onclose = function (e) {
        console.log('closed', e)
    }
    return (
        <div>
            Websocket
        </div>
    );
}