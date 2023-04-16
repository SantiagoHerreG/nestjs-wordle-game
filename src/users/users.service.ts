import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
  ) {}

  async create(user: Users): Promise<Users> {
    return await this.userModel.create({
      ...user,
    });
  }

  async findAll(): Promise<Users[]> {
    const res = await this.userModel.findAll();
    console.log(res);
    return res;
  }

  async findOne(id: string): Promise<Users> {
    return await this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
