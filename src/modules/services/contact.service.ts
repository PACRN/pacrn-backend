import { Contact } from '../entities/contact.entities';
import { ContactRepository } from '../repositories/contact.repository';
import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';

@Service()
export class ContactService extends BaseService<Contact> {
    constructor(
        @Inject(() => ContactRepository) private contactRepository: ContactRepository
    ) {
        super(contactRepository)
    }

    public async CreateContactMessages(Contact: Contact): Promise<Contact> {
        try {
            return await this.contactRepository.create(Contact)
        } catch (ex) {
            throw ex
        }
    }
}