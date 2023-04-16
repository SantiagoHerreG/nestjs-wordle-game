import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Attempts } from './entities/attempts.model';
import { Users } from 'src/users/entities/user.model';
import { AttemptsService } from './attempts.service';
import { AttemptsController } from './attempts.controller';

@Module({
  imports: [SequelizeModule.forFeature([Users, Attempts])],
  providers: [AttemptsService, Logger],
  controllers: [AttemptsController],
})
export class AttemptsModule {}
