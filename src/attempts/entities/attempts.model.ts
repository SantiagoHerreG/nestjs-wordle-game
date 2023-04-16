import { Column, Model, Table } from 'sequelize-typescript';
import { Users } from 'src/users/entities/user.model';

@Table
export class Attempts extends Model<Attempts> {
  @Column
  currentAttempt: number;

  @Column
  userId: number;
}

Users.hasOne(Attempts, { foreignKey: 'userId' });
Attempts.belongsTo(Users, { foreignKey: 'userId' });
