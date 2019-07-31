// Nest
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';

// Modules
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { BrandsModule } from './modules/brands/brands.module';
import { ProductsModule } from './modules/products/products.module';
import { CouponsModule } from './modules/coupons/coupons.module';
import { DiscountsModule } from './modules/discounts/discounts.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { SubcategoriesModule } from './modules/subcategories/subcategories.module';
import { AccountDetailsModule } from './modules/account_details/account_details.module';
import { UbigeosModule } from './modules/ubigeos/ubigeos.module';

import { AuthModule } from './modules/auth/auth.module';

//  Database import
import { DatabaseModule } from './database';

//  Gateway sockets
import { AppGateway } from './app.gateway';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { TokenMiddleware } from './common/middlewares/token.middleware';

@Module({
    imports: [
        DatabaseModule,
        AuthModule,
        UsersModule,
        ArticlesModule,
        CategoriesModule,
        BrandsModule,
        ProductsModule,
        CouponsModule,
        DiscountsModule,
        FavoritesModule,
        SellersModule,
        SubcategoriesModule,
        AccountDetailsModule,
        UbigeosModule
    ],
    controllers: [
    ],
    providers: [
        AppGateway
    ]
})

export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware, TenantMiddleware, TokenMiddleware)
            .forRoutes('*');
    }
}
