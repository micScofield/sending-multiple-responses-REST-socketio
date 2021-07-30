import socketClient from 'socket.io-client'

const SERVER = 'http://localhost:5000'

export const connect = () => {
    const socket = socketClient(SERVER)
    return socket
}