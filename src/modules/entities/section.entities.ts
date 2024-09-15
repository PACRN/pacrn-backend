import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { SubSection } from './subSection.entities';
@Entity()
export class Section {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  careType: string;

  @Column('text')
  sectionName: string;

  @Column('text')
  code: string;

  @OneToMany(() => SubSection, (subSection) => subSection.section)
  subSections: SubSection[];
}
