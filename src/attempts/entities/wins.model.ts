import { Column, Model, Table } from 'sequelize-typescript';
import { Users } from 'src/users/entities/user.model';

@Table
export class Wins extends Model<Wins> {
  @Column
  word: string;

  @Column
  userId: number;
}

Users.hasOne(Wins, { foreignKey: 'userId' });
Wins.belongsTo(Users, { foreignKey: 'userId' });
