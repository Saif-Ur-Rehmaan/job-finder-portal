import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Company } from './company.entity';
@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar' })
  public image: string;

  @Column({ type: 'varchar' })
  public title: string;

  @Column({ type: 'int' })
  public company_id: number;

  @Column({ type: 'varchar' })
  public type: string;

  @Column({ type: 'text' }) // or tinytext if MySQL
  public description: string;

  @Column({ type: 'int' })
  public vacancy: number;

  @Column({ type: 'json' })
  public salary: { min: number; max: number; annual: number };

  @Column({ type: 'json' })
  public contact_info: { email: string; contact_number?: string };

  @Column({ type: 'json' })
  public requirements: {
    data: Array<{
      heading: string;
      before_points_Text: string;
      points: Array<string>;
      after_points_Text: string;
    }>;
  };
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  public application_date?: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: true,
  })
  public created_at?: Date;

  @ManyToOne(() => Company, (company) => company.jobs)
  @JoinColumn({ name: 'company_id' })
  public company: Company;
}
