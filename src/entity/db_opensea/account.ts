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

  toSimpleAccount() {
    const account = new simpleAccount();
    account.address = this.address;
    account.private_key = this.private_key;
    return account;
  }
}

export class simpleAccount {
  address: string;
  private_key: string;
}
