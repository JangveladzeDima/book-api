import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "user",
})
export class User extends Model {
  @Column({ unique: true })
  email: string;

  @Column
  nickname: string;

  @Column
  password: string;
}
