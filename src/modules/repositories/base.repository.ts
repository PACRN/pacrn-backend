import { Repository, EntityTarget, FindManyOptions, FindOneOptions, DataSource, FindOptions, FindOptionsWhere } from 'typeorm';
import { DeepPartial, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export class BaseRepository<T extends ObjectLiteral> {
    protected repository: Repository<T>;

    constructor(entity: EntityTarget<T>, dataSource: DataSource) {
        this.repository = dataSource.getRepository(entity);
    }

    async findAll(options?: FindManyOptions<T>): Promise<T[]> {
        return this.repository.find(options);
    }

    async findOne(id: number, options?: FindOneOptions<T>): Promise<T | undefined> {
        return this.repository.findOne({ where: { id } as any, ...options });
    }

    async findOneBy(options?: FindOneOptions<T>): Promise<T | undefined> {
        return this.repository.findOne({ ...options });
    }

    async create(entity: DeepPartial<T>): Promise<T> {
        const newEntity = this.repository.create(entity);
        return this.repository.save(newEntity);
    }

    async update(id: number, entity: QueryDeepPartialEntity<T>): Promise<T | undefined> {
        await this.repository.update(id, entity);
        return this.findOne(id);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }

    async deleteBasedOnCodition(options?: FindOptionsWhere<T>): Promise<void> {
        await this.repository.delete(options);
    }

    async createAll(entity: DeepPartial<T[]>): Promise<T[]> {
        const newEntity = this.repository.create(entity)
        return this.repository.save(newEntity)
    }
}
