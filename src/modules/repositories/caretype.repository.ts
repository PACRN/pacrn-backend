import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { Cares } from "../entities/cares.entities";
import { CareType } from "../entities/careTypes.entities";

@Service()
export class CareTypeRepository extends BaseRepository<CareType> {
    public source: DataSource;
    constructor(@Inject(() => DataSource) dataSource: DataSource) {
        super(CareType, dataSource);
        this.source = dataSource;
    }
}