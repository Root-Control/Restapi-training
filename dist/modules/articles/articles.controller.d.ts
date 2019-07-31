import { ArticlesGateway } from '../articles/articles.gateway';
export declare class ArticlesController {
    private readonly articlesService;
    private readonly articlesSocket;
    constructor(articlesService: any, articlesSocket: ArticlesGateway);
    list(req: any): Promise<any>;
    create(req: any): Promise<any>;
    getArticleById(req: any): Promise<any>;
    updateArticleById(req: any): Promise<any>;
    patchArticleById(req: any): Promise<any>;
    deleteArticle(req: any): Promise<any>;
}
