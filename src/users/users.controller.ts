import { Controller, Get, Logger, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { Users } from './entities/user.model';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async getUser(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<Users[]>> {
    this.logger.log('was called', request);
    const users = await this.usersService.findAll();
    return response.status(200).json(users);
  }

  @Get(':id')
  async getUserById(
    @Req() request: Request,
    @Res() response,
  ): Promise<Response<Users>> {
    const user = await this.usersService.findOne(request.params.id);

    return response.status(200).send(user);
  }

  @Post()
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<Users>> {
    const user = await this.usersService.create(request.body);
    return response.status(200).json(user);
  }
}
