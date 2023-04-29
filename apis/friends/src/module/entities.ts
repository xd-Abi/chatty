import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sender: string;

  @Column({ nullable: false })
  recipient: string;

  @Column()
  status: 'pending' | 'accepted' | 'rejected';
}
