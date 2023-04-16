import { Logger, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './entities/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  providers: [UsersService, Logger],
  controllers: [UsersController],
})
export class UsersModule {}
