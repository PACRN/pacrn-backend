import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { Contact } from "../entities/contact.entities";

@Service()
export class ContactRepository extends BaseRepository<Contact> {
    constructor(@Inject(() => DataSource) datasource: DataSource) {
        super(Contact, datasource)
    }
}