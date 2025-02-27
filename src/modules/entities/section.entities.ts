import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { SubSection } from './subSection.entities';
import { Provider } from './providers.entities';
@Entity()
export class Section {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('text')
  careType: string;

  @Column('text')
  sectionName: string;

  @Column()
  code: string;

  @OneToMany(() => SubSection, (subSection) => subSection.section)
  subSections: SubSection[];

  @ManyToOne(() => Provider, provider => provider.section)
  @JoinColumn({ name: 'code', referencedColumnName: 'code' }) // Correctly defines the foreign key column
  provider: Provider;

  @Column('text', { nullable: true })
  sectionGroup: string;
}
