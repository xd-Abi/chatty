import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  /**
   * The uid is generated from the auth0
   */
  @PrimaryColumn()
  uid: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  avatar: string;
}
