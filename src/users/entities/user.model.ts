import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Users extends Model<Users> {
  @Column
  firstName: string;

  @Column
  lastName: string;
}
