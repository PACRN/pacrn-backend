import { DataSource, EntityRepository } from "typeorm";
import { Providers } from "../entities/providers.entities";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';

@Service()
export class ProvidersRepository extends BaseRepository<Providers> {
    constructor(@Inject(() => DataSource) dataSource: DataSource) {
        super(Providers, dataSource);
    }
}