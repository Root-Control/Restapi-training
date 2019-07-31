"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io-client");
class IoConnector {
    constructor(url, message) {
        this.url = url;
        this.message = message;
    }
    sendMessage() {
        const socket = socketIo(this.url);
        console.log('initializing socket');
        socket.on('connect', () => console.log('connected'));
        socket.on('messages', messages => {
            console.log('Message from external server');
            console.log(messages);
            socket.disconnect();
        });
    }
}
exports.IoConnector = IoConnector;
//# sourceMappingURL=io.js.map