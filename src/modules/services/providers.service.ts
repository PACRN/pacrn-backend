import { Equal, Like } from 'typeorm';
import { Provider } from '../entities/providers.entities';
import { ProvidersRepository } from '../repositories/providers.repository';
import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';
import os from 'os';
import { GeoType } from '../../types/geoType';
import { calculateNearest, runWorker } from '../../utilities/distanceFinder';
import { PaginationParams } from '../../types/paginationParams';
import { ListResponse } from '../../types/listResponseType';

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
                relations: ['images', 'locations'],
                select: {
                    id: true,
                    code: true,
                    name: true,
                    phone: true,
                    email: true,
                    services: true,
                    tags: true,
                    images: {
                        imagePath: true,
                        imageOrder: true
                    },
                    locations: {
                        address: true,
                        city: true,
                        state: true,
                        country: true,
                        postalCode: true,
                        latitude: true,
                        longitude: true,
                        addressTypeId: true
                    }
                },
                order: {
                    images: {
                        imageOrder: 'ASC'
                    }
                },
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
                    services: Like(`%${careType}%`),
                    locations: {
                        addressTypeId: Equal(1)
                    }
                },
                relations: {
                    'images': true,
                    'locations': true
                },
                select: {
                    id: true,
                    code: true,
                    name: true,
                    phone: true,
                    email: true,
                    services: true,
                    tags: true,
                    images: {
                        imagePath: true,
                        imageOrder: true
                    },
                    locations: {
                        address: true,
                        city: true,
                        state: true,
                        country: true,
                        postalCode: true,
                        latitude: true,
                        longitude: true,
                    }
                },
                order: {
                    images: {
                        imageOrder: 'ASC'
                    }
                },
                ...queryPagination
            });
            return data;
        } catch (error) {
            throw error
        }
    }

    public async GetNearestProviders(careType: string, radius: number = 5, currentLocation: GeoType, pagination: PaginationParams): Promise<ListResponse> {
        try {
            // Fetch all providers that match the careType without applying pagination
            let providersRepository = await this.providersRepository.source.getRepository(Provider);

            // Calculate the conversion from miles to kilometers
            const radiusInKm = radius * 1.60934;

            const providers = await providersRepository.createQueryBuilder('provider')
                .leftJoinAndSelect('provider.images', 'images')
                .leftJoinAndSelect('provider.locations', 'locations')
                .where('provider.services LIKE :careType', { careType: `%${careType}%` })
                .andWhere(`get_distance_from_lat_lon_km(${currentLocation.lat}, ${currentLocation.lon}, locations.latitude, locations.longitude) <= ${radiusInKm}`)
                .select([
                    'provider.id',
                    'provider.code',
                    'provider.name',
                    'provider.phone',
                    'provider.email',
                    'provider.services',
                    'provider.tags',
                    'images.imagePath',
                    'images.imageOrder',
                    'locations.address',
                    'locations.city',
                    'locations.state',
                    'locations.country',
                    'locations.postalCode',
                    'locations.latitude',
                    'locations.longitude'
                ])
                .addSelect(`get_distance_from_lat_lon_km(:refLat, :refLon, locations.latitude, locations.longitude)`, 'distance')
                .setParameter('refLat', currentLocation.lat)
                .setParameter('refLon', currentLocation.lon)
                .orderBy('distance', 'ASC') // Optional: Order by distance
                .getMany();


            // Apply pagination to get the first pageSize results
            const queryPagination = {
                skip: (pagination.page - 1) * pagination.pageSize,
                take: pagination.pageSize
            };

            return {
                data: providers.slice(queryPagination.skip, queryPagination.skip + queryPagination.take),
                total: providers.length
            };
        } catch (error) {
            throw error;
        }
    }

}
