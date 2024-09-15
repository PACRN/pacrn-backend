import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Question } from './question.entities';

@Entity()
export class Response {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ nullable: true })
    responseText: string;

    @ManyToOne(() => Question, (question) => question.responses)
    question: Question;
}
