import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { Location } from "../entities/location.entities";

@Service()
export class LocationRepository extends BaseRepository<Location> {
    constructor(@Inject(() => DataSource) dataSource: DataSource) {
        super(Location, dataSource);
    }
}