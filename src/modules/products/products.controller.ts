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

import { ProductsService } from './products.service';

// Guards
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../decorators/roles.decorator';

import { AppGateway } from '../../app.gateway';

@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
    constructor(@Inject(ProductsService) private readonly productsService) {
    }
    /* --------------------------------------------------------------------

    Module     : Products
    Controller : Product Controller

    ---------------------------------------------------------------------

    Description :

    Aditional information: All role routes are working with Guards, and Guards
    are defining the current req.product value.

    Middleware description:

    Route:
    /api/products
    ----------------------------------------------------------------------*/

    /*
        Route:        GET api/products
        Roles:        user, admin
        Description:  Get list of products
    */

    @Get('')
    @Roles('user', 'admin')
    async list(@Req() req) {
        const products = await this.productsService.list();
        return products;
    }

    /*
        Route:        Post api/products
        Roles:        user, admin
        Description:  Create a new Product
    */

    @Post('')
    @Roles('user', 'admin')
    async create(@Req() req) {
        const product = req.body;
        product.creator = req.user._id;
        await this.productsService.create(product);
        return product;
    }

    /*
        Route:        GET api/products/:productId
        Roles:        product, admin
        Description:  Get product by provided Id.
    */

    @Get(':productId')
    @Roles('user', 'admin')
    async getProductById(@Req() req) {
        const product = req.product;
        return product;
    }

    /*
        Route:        PUT api/products/:productId
        Roles:        product, admin
        Description:  Get product by provided Id.
    */

    @Put(':productId')
    @Roles('user', 'admin')
    async updateProductById(@Req() req) {
        const product = req.product;
        return await this.productsService.update(product, req.body);
    }

    /*
        Route:        DELETE api/products/:productId
        Roles:        user, admin
        Description:  Delete product provide by id.
    */

    @Patch(':productId')
    @Roles('user', 'admin')
    async patchProductById(@Req() req) {
        const product = req.product;
        return await this.productsService.patch(product, req.body);
    }

    /*
        Route:        DELETE api/products/:productId
        Roles:        user, admin
        Description:  Delete product provide by id.
    */

    @Delete(':productId')
    @Roles('user', 'admin')
    async deleteProduct(@Req() req) {
        const product = req.product;
        return await this.productsService.delete(product);
    }
}
