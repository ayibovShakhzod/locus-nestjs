import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('varchar', { unique: true })
  username: string;

  @Column('text')
  password: string;

  @Column('text')
  email: string;

  @ManyToOne(() => Role, role => role.users)
  role: Role;

  @Column('varchar', { nullable: true })
  hash_refresh_token: string;
}
