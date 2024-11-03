import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { User } from "../entities/user.entities";

@Service()
export class UserRepository extends BaseRepository<User> {
    public source: DataSource;
    constructor(@Inject(() => DataSource) datasource: DataSource) {
        super(User, datasource)
        this.source = datasource
    }
}