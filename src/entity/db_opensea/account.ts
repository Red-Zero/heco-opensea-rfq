import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  private_key: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
