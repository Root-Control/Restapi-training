import {
    Controller,
    Post,
    Get,
    Put,
    Patch,
    Delete,
    Param,
    UseGuards,
    Inject,
    Req
} from '@nestjs/common';

import { ArticlesService } from './articles.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('articles')
@UseGuards(RolesGuard)
export class ArticlesController {
    constructor(@Inject(ArticlesService) private readonly articlesService,
                private readonly appGateway: AppGateway) {
    }
    /* --------------------------------------------------------------------

    Module     : Articles
    Controller : Article Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.article value.

    Middleware description:

    Route:
    /api/articles
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/articles
        Roles:        user, admin
        Description:  Get list of articles
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const articles = await this.articlesService.list();
        return articles;
    }

    /*
        Route:        Post api/articles
        Roles:        user, admin
        Description:  Create a new Article
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const article = req.body;
        article.creator = req.user._id;
        await this.articlesService.create(article);
        this.appGateway.modelCreationSocket('article', article);
        return article;
    }

    /*
        Route:        GET api/articles/:articleId
        Roles:        article, admin
        Description:  Get article by provided Id.
    */

    @Get(':articleId')
    @Roles('user', 'admin')
    async getArticleById(@Req() req) {
        const article = req.article;
        return article;
    }

    /*
        Route:        PUT api/articles/:articleId
        Roles:        article, admin
        Description:  Get article by provided Id.
    */

    @Put(':articleId')
    @Roles('user', 'admin')
    async updateArticleById(@Req() req) {
        const article = req.article;
        return await this.articlesService.update(article, req.body);
    }

    /*
        Route:        DELETE api/articles/:articleId
        Roles:        user, admin
        Description:  Delete article provide by id.
    */

    @Patch(':articleId')
    @Roles('user', 'admin')
    async patchArticleById(@Req() req) {
        const article = req.article;
        return await this.articlesService.patch(article, req.body);
    }

    /*
        Route:        DELETE api/articles/:articleId
        Roles:        user, admin
        Description:  Delete article provide by id.
    */

    @Delete(':articleId')
    @Roles('user', 'admin')
    async deleteArticle(@Req() req) {
        const article = req.article;
        return await this.articlesService.delete(article);
    }
}
