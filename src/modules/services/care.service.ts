import { Cares } from '../entities/cares.entities';
import { CareType } from '../entities/careTypes.entities';
import { CareRepository } from '../repositories/care.repository';
import { CareTypeRepository } from '../repositories/caretype.repository';
import { ProvidersRepository } from '../repositories/providers.repository';
import { BaseService } from './base.service';
import { Service, Inject } from 'typedi';

@Service()
export class CareService extends BaseService<Cares> {
    constructor(
        @Inject(() => CareRepository) private careRepository: CareRepository,
        @Inject(() => CareTypeRepository) private careTypeRepository: CareTypeRepository
    ) { super(careRepository) }

    public async GetCares(): Promise<Cares[]> {
        try {
            let data = await this.repository.findAll({
                relations: {
                    'careTypes': true
                },
                select: {
                    'name': true,
                    'careTypes': {
                        'name': true,
                        id: true
                    }
                }
            })

            return data;
        } catch (error) {
            throw error
        }
    }

    public async CreateCare(care: Cares): Promise<Cares> {
        try {
            let data = await this.repository.create(care);
            return data;
        } catch (error) {
            throw error
        }
    }

    public async UpdateCare(care: Cares): Promise<Cares> {
        try {
            let data = await this.repository.update(care.id, care);
            return data;
        } catch (error) {
            throw error
        }
    }

    // Delete a care 
    public async DeleteCare(id: number): Promise<void> {
        try {
            await this.repository.delete(id);
        } catch (error) {
            throw error
        }
    }

    // Add caretypes from the carerepo
    public async AddCareType(careId: number, careType: CareType): Promise<CareType> {
        try {
            let care = await this.repository.findOne(careId);
            if (!care) {
                throw new Error('Care not found');
            }

            let careTypeData: CareType = {
                id: null,
                name: careType.name,
                care: care
            }

            let data = await this.careTypeRepository.create(careTypeData);
            return data;
        } catch (error) {
            throw error
        }
    }
}
