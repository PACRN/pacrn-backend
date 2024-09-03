import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Provider } from "./providers.entities";
import { Response } from "./response.entities";

@Entity()
export class Question {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    question: string;


    @OneToMany(() => Response, answer => answer.question)
    answers: Response[];
}