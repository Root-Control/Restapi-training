import { Connection } from 'mongoose';
import { Request } from 'express';
export declare class ArticlesService {
    private readonly connection;
    private readonly request;
    private params;
    constructor(connection: Connection, request: Request);
    create(article: any): Promise<any>;
    list(): Promise<any>;
    update(article: any, body: any): Promise<any>;
    patch(article: any, body: any): Promise<any>;
    delete(article: any): Promise<any>;
}
