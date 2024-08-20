import { Providers } from '../entities/providers.entities';
import { ProvidersRepository } from '../repositories/providers.repository';
import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';

@Service()
export class ProvidersService extends BaseService<Providers> {
    constructor(
        @Inject(() => ProvidersRepository) private providersRepository: ProvidersRepository
    ) { super(providersRepository) }

    public async GetAllProviders(): Promise<Providers[]> {
        try {
            let data = await this.repository.findAll({
                relations: {
                    careType: true,
                    location: true,
                    tags: true,
                    ratings: true,
                    reviews: true,
                    report: true
                }
            });

            return data;
        } catch (error) {
            throw error
        }
    }


    // Add any Providers-specific service methods here if needed
}
