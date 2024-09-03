import { Like } from 'typeorm';
import { Provider } from '../entities/providers.entities';
import { ProvidersRepository } from '../repositories/providers.repository';
import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';
import os from 'os';
import { GeoType } from '../../types/geoType';
import { calculateNearest, runWorker } from '../../utilities/distanceFinder';
import { PaginationParams } from '../../types/paginationParams';

@Service()
export class ProvidersService extends BaseService<Provider> {
    constructor(
        @Inject(() => ProvidersRepository) private providersRepository: ProvidersRepository
    ) { super(providersRepository) }

    public async GetAllProviders(pagination: PaginationParams): Promise<Provider[]> {
        try {
            const queryPagination = {
                skip: (pagination.page - 1) * pagination.pageSize,
                take: pagination.pageSize
            };

            let data = await this.repository.findAll({
                
                ...queryPagination
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
                    locations: true
                }
            });
            return data;
        } catch (error) {
            throw error
        }
    }

    public async FindProvidersByCare(careType: string, pagination: PaginationParams): Promise<Provider[]> {
        try {
            const queryPagination = {
                skip: (pagination.page - 1) * pagination.pageSize,
                take: pagination.pageSize
            };
            
            let data = await this.providersRepository.findAll({
                where: {
                    services: Like(`%${careType}%`)
                },
                relations: {
                    'images': true,
                    'locations': true
                },

                ...queryPagination
            });
            return data;
        } catch (error) {
            throw error
        }
    }

    public async GetNearestProviders(careType: string, radius: number = 5, currentLocation: GeoType, pagination: PaginationParams): Promise<Provider[]> {
        try {
            const queryPagination = {
                skip: (pagination.page - 1) * pagination.pageSize,
                take: pagination.pageSize
            };
    
            // Fetch the initial subset of providers that match the careType
            let providers: Provider[] = await this.providersRepository.findAll({
                where: {
                    services: Like(`%${careType}%`)
                },
                
                ...queryPagination // Apply pagination directly in the query
            });
    
            // Calculate the conversion from miles to kilometers
            const radiusInKm = radius * 1.60934;
    
            // Parallel processing setup remains similar
            const maxWorkers = os.cpus().length;
            let numWorkers = Math.min(providers.length, maxWorkers);
    
            if (providers.length < numWorkers) {
                numWorkers = 1; // Reduce the number of workers if fewer providers than CPUs
            }
    
            const chunkSize = Math.ceil(providers.length / numWorkers);
            const locationChunks = [];
    
            for (let i = 0; i < numWorkers; i++) {
                locationChunks.push(providers.slice(i * chunkSize, (i + 1) * chunkSize));
            }
    
            let nearestProviders = [];
    
            // Use Promise.all to process each chunk in parallel
            const data = nearestProviders.concat(await Promise.all(
                locationChunks.map(chunk => calculateNearest(currentLocation, chunk, radiusInKm))
            ));
    
            // Flatten the array and filter out empty results
            return data.filter(array => array.length > 0).flat();
        } catch (error) {
            throw error;
        }
    }
}
