import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;
  @OneToMany(() => User, (user) => user.role)
  public users: User[];
}
