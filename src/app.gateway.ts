import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
    OnGatewayInit
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()

export class AppGateway implements OnGatewayInit {
    @WebSocketServer() server;

    constructor() {
        console.log('Initializing Socket');
        console.log('Para utilizar est socket solo es necesario declararlo en providers e inyectarlo en el controlador/servicio');
    }

    afterInit() {
        //  En cada conexión al servidor, ésta linea guardará a los usuarios
        this.server.authenticatedUsers = [];
        this.server.sockets.on('connection', function(socket) {
            this.server.authenticatedUsers.push({ time: 1 });
            console.log('User Connected');
        });
    }

    modelCreationSocket(model, data) {
        //  Este socket puede llamarse cada vez que se crea un nuevo modelo
        return this.server.emit(`${model}Channel`, data);
    }
}
