import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { SubSection } from './subSection.entities';
import { Response } from './response.entities';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  questionText: string;

  @ManyToOne(() => SubSection, (subSection) => subSection.questions)
  subSection: SubSection;

  @OneToMany(() => Response, (response) => response.question)
  responses: Response[];
}
