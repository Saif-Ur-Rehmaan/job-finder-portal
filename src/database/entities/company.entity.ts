import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Job } from './Job.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  public id: number;
  @Column({ type: 'varchar', length: 255 })
  public name: string;
  @Column({ type: 'text', nullable: true })
  public website?: string;
  @Column({ type: 'text' })
  public short_description: string;
  @Column({ type: 'json' })
  public contact_info: { email: string; contact_number?: string };
  @Column({ type: 'json', nullable: true })
  public location: {
    url?: string;
    longitude?: number;
    latitude?: number;
    country?: string;
  } | null;

  @OneToMany(() => Job, (job) => job.company)
  public jobs: Job[];
}
