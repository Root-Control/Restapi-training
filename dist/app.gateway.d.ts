import { OnGatewayInit } from '@nestjs/websockets';
export declare class AppGateway implements OnGatewayInit {
    server: any;
    constructor();
    afterInit(): void;
}
