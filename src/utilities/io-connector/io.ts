import { Inject, HttpException, HttpStatus } from '@nestjs/common';
import * as socketIo from 'socket.io-client';

export class IoConnector {
    constructor(private readonly url, private readonly message) {
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
