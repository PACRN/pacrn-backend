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
import { Section } from '../entities/section.entities';
import { SectionRepository } from '../repositories/section.repository';

@Service()
export class ProvidersService extends BaseService<Provider> {
    constructor(
        @Inject(() => ProvidersRepository) private providersRepository: ProvidersRepository,
        @Inject(() => SectionRepository) private sectionRepository: SectionRepository
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
            const query = `SELECT * FROM get_nearest_providers($1, $2, $3, $4, $5, $6);`;

            const result = await this.providersRepository.source.query(query, [
                currentLocation.lat,
                currentLocation.lon,
                radius,
                pagination.pageSize,
                pagination.page,
                careType
            ]);

            const count = result.length > 0 ? result[0].total_count : 0;

            const data = result.map(row => ({
                id: row.id,
                code: row.code,
                name: row.name,
                phone: row.phone,
                email: row.email,
                services: row.services,
                tags: row.tags,
                location: row.location,
                address: row.address,
                city: row.city,
                state: row.state,
                country: row.country,
                postalCode: row.postalCode,
                latitude: row.latitude,
                longitude: row.longitude,
                imagePaths: row.imagepaths,
                total_count: row.total_count,
            }));

            return {
                data: data,
                total: count
            };
        } catch (error) {
            throw error;
        }
    }

    public async GetQnAForProvider(code: string): Promise<Section[]> {

        const sections = await this.sectionRepository.findAll({
            where: {
                code: code
            },
            relations: [
                'subSections',
                'subSections.questions',
                'subSections.questions.responses'
            ],
        })

        return sections;
    }

}
