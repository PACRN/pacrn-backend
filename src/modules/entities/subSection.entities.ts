import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Section } from './section.entities';
import { Question } from './question.entities';

@Entity()
export class SubSection {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Section, (section) => section.subSections)
  section: Section;

  @Column('text')
  subSectionName: string;

  @OneToMany(() => Question, (question) => question.subSection)
  questions: Question[];
}
