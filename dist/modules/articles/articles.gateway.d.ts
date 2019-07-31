import { OnGatewayInit } from '@nestjs/websockets';
export declare class ArticlesGateway implements OnGatewayInit {
    server: any;
    constructor();
    afterInit(): void;
    sendArticlesListFromSocket(articles: any): any;
    sendCreatedArticle(article: any): any;
    findAll(client: any, data: any): any;
}
