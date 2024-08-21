import { ObjectLiteral } from 'typeorm';
import { Provider } from '../entities/providers.entities';
import { ProvidersRepository } from '../repositories/providers.repository';
import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';

@Service()
export class ProvidersService extends BaseService<Provider> {
    constructor(
        @Inject(() => ProvidersRepository) private providersRepository: ProvidersRepository
    ) { super(providersRepository) }

    public async GetAllProviders(): Promise<Provider[]> {
        try {
            let data = await this.repository.findAll({
                relations: {
                    'reviews': true,
                    'ratings': true,
                    'location': true
                }
            });


            return data;
        } catch (error) {
            throw error
        }
    }

    public async GetProvider(id: number): Promise<Provider> {
        try {
            let data = await this.repository.findOne(id, {
                relations: {
                    'reviews': true,
                    'ratings': true,
                    'location': true
                }
            });
            return data;
        } catch (error) {
            throw error
        }
    }

    public async GetNearestProviders(): Promise<ObjectLiteral[]> {
        try {
            let data = await this.providersRepository.findNearbyProviders(37.7749, -122.4194, 5);
            return data;
        } catch (error) {
            throw error
        }
    }

}
