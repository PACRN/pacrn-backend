import { createQueryBuilder, DataSource, EntityRepository } from "typeorm";
import { Provider } from "../entities/providers.entities";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';

@Service()
export class ProvidersRepository extends BaseRepository<Provider> {

  public source: DataSource;

  constructor(@Inject(() => DataSource) dataSource: DataSource) {
    super(Provider, dataSource);
    this.source = dataSource
  }
}