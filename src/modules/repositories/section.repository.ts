import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { Section } from "../entities/section.entities";

@Service()
export class SectionRepository extends BaseRepository<Section> {
    public source: DataSource;
    constructor(@Inject(() => DataSource) datasource: DataSource) {
        super(Section, datasource)
        this.source = datasource
    }
}