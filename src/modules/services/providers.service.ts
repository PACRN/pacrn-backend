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
import { LocationRepository } from '../repositories/location.repository';
import { ImageRepository } from '../repositories/images.repository';
import { ReportRepository } from '../repositories/report.repository';
import { Reports } from '../entities/reports.entities';

@Service()
export class ProvidersService extends BaseService<Provider> {
    constructor(
        @Inject(() => ProvidersRepository) private providersRepository: ProvidersRepository,
        @Inject(() => SectionRepository) private sectionRepository: SectionRepository,
        @Inject(() => ImageRepository) private imageRepository: ImageRepository,
        @Inject(() => LocationRepository) private locationRepository: LocationRepository,
        @Inject(() => ReportRepository) private reportRepository: ReportRepository
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
                relations: ['images', 'locations', 'rating'],
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
                    },
                    rating: {
                        abusereport: true,
                        healthInspection: true,
                        longStayQuality: true,
                        moreinfo: true,
                        overall: true,
                        qualityMeasure: true,
                        shortStatyQuality: true,
                        staffRating: true
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

    public async GetNearestProvidersOptimized(careType: string, radius: number = 5, currentLocation: GeoType, pagination: PaginationParams): Promise<ListResponse> {
        try {
            let providersRepository = await this.providersRepository.source.getRepository(Provider);

            // Calculate the conversion from miles to kilometers
            const radiusInKm = radius * 1.60934;

            const providers = await providersRepository.createQueryBuilder('provider')
                .leftJoinAndSelect('provider.images', 'images')
                .leftJoinAndSelect('provider.locations', 'locations')
                .leftJoinAndSelect('provider.rating', 'rating')
                .leftJoinAndSelect('provider.totalReview', 'total_review')
                .leftJoinAndSelect('total_review.review', 'review')
                .leftJoinAndSelect('provider.section', 'section')
                .where('provider.services LIKE :careType', { careType: `%${careType}%` })
                .andWhere('provider."isActive" = True ')
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
                    'locations.longitude',
                    'rating.overall',
                    'rating.healthInspection',
                    'rating.qualityMeasure',
                    'rating.staffRating',
                    'rating.longStayQuality',
                    'rating.shortStatyQuality',
                    'rating.moreinfo',
                    'rating.abusereport',
                    'section.sectionName',
                    'total_review.id',
                    'total_review.totalRating',
                    'total_review.totalReviews',
                    'review.review',
                    'review.source',
                    'review.rating',
                    'review.reviewPeriod'
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
            throw error
        }
    }

    public async GetNearestProviders(careType: string, radius: number = 5, currentLocation: GeoType, pagination: PaginationParams): Promise<ListResponse> {
        try {
            const radiusInMeters = radius * 1609.34;

            const providers = await this.providersRepository.source.createQueryBuilder()
                .from(Provider, 'p')  // Set alias using 'from' method
                .select([
                    'p.id',
                    'p.code',
                    'p.name',
                    'p.phone',
                    'p.email',
                    'p.services',
                    'p.tags'
                ])
                .where(
                    `ST_DWithin(
                p.location, 
                ST_SetSRID(ST_MakePoint(:lon, :lat), 4326), 
                :radius
              )`,
                    { lat: currentLocation.lat, lon: currentLocation.lon, radius: radiusInMeters }
                )
                .andWhere('p.services ILIKE :service', { service: '%' + careType + '%' })
                .limit(pagination.pageSize)
                .offset(pagination.page)
                .getMany();

            const processedProviders = await Promise.all(
                providers.map(async (provider) => {
                    // Fetch locations and images concurrently for each provider
                    const [address, images] = await Promise.all([
                        this.locationRepository.findAll({
                            select: [
                                'address',
                                'city',
                                'country',
                                'latitude',
                                'longitude',
                                'postalCode',
                                'state'
                            ],
                            where: {
                                providerCode: provider.code,
                                addressTypeId: 1
                            }
                        }),
                        this.imageRepository.findAll({
                            select: [
                                'imagePath',
                                'imageCaption',
                                'imageOrder'
                            ],
                            where: {
                                providerCode: provider.code
                            }
                        })
                    ]);

                    // Add the locations and images to the provider object
                    provider.locations = address;
                    provider.images = images;

                    return provider;
                })
            );


            return {
                data: processedProviders,
                total: processedProviders.length
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

    public async SaveReport(code: string, category: string, desc: string): Promise<Reports> {
        const reports = await this.reportRepository.create({
            category: category,
            code: code,
            description: desc,
            isResolved: false
        })

        return reports;
    }

}
