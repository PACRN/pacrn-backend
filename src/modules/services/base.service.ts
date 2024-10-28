import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { BaseRepository } from "../repositories/base.repository";
import { FindOneOptions } from "typeorm";

export class BaseService<T> {
    protected repository: BaseRepository<T>;

    constructor(repository: BaseRepository<T>) {
        this.repository = repository;
    }

    async findAll(): Promise<T[]> {
        return this.repository.findAll();
    }

    async findOne(id: number): Promise<T | undefined> {
        return this.repository.findOne(id);
    }

    async findOneBy(options?: FindOneOptions<T>): Promise<T | undefined> {
        return this.repository.findOneBy(options);
    }

    async create(entity: T): Promise<T> {
        return this.repository.create(entity);
    }

    async update(id: number, entity: QueryDeepPartialEntity<T>): Promise<T> {
        return this.repository.update(id, entity);
    }

    async delete(id: number): Promise<void> {
        return this.repository.delete(id);
    }
}
