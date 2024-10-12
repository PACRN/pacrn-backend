import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { Reports } from "../entities/reports.entities";

@Service()
export class ReportRepository extends BaseRepository<Reports> {
    constructor(@Inject(() => DataSource) dataSource: DataSource) {
        super(Reports, dataSource);
    }
}