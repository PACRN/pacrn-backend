import "reflect-metadata"

import {
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  FindOptionsSelect,
  FindOptionsWhere,
  OrderByCondition,
} from "typeorm"


  import { FindOptionsOrder } from "typeorm/find-options/FindOptionsOrder"
  import { FindOptionsRelations } from "typeorm/find-options/FindOptionsRelations"


export interface FindConfig<Entity> {
    select?: (keyof Entity)[]
    skip?: number
    take?: number
    relations?: string[]
    order?: { [K: string]: "ASC" | "DESC" }
  }
  
  export type ExtendedFindConfig<TEntity> = (
    | Omit<FindOneOptions<TEntity>, "where" | "relations" | "select">
    | Omit<FindManyOptions<TEntity>, "where" | "relations" | "select">
  ) & {
    select?: FindOptionsSelect<TEntity>
    relations?: FindOptionsRelations<TEntity>
    where: FindOptionsWhere<TEntity> | FindOptionsWhere<TEntity>[]
    order?: FindOptionsOrder<TEntity>
    skip?: number
    take?: number
  }