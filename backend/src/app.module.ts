import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerModule } from './commons/logger';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { LoggerMiddleware } from './commons/middleware/LoggerMiddleware';
import { CatsModule } from './cats/cats.module';
import { FavoriteModule } from './favorite/favorite.module';

@Module({
  imports: [
    LoggerModule,

    // route
    AuthModule,
    ProfileModule,
    CatsModule,
    FavoriteModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
