import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entities";

@Entity()
export class Response {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    response: string;

    @ManyToOne(() => Question, question => question.answers)
    question: Question;
}