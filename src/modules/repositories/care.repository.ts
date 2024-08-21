import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { Cares } from "../entities/cares.entities";
import { CareType } from "../entities/careTypes.entities";

@Service()
export class CareRepository extends BaseRepository<Cares> {
    constructor(@Inject(() => DataSource) dataSource: DataSource) {
        super(Cares, dataSource);
    }
}