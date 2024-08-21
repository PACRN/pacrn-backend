import { createQueryBuilder, DataSource, EntityRepository } from "typeorm";
import { Provider } from "../entities/providers.entities";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';

@Service()
export class ProvidersRepository extends BaseRepository<Provider> {
    constructor(@Inject(() => DataSource) dataSource: DataSource) {
        super(Provider, dataSource);
    }

    findNearbyProviders(lat: number, lon: number, radiusInMiles: number) {
        const radiusInMeters = radiusInMiles * 1609.34;  // Convert miles to meters
        return createQueryBuilder("provider")
          .innerJoinAndSelect("provider.location", "location")
          .where(`
            6371000 * acos(
              cos(radians(:lat)) * 
              cos(radians(CAST(ST_Y(location.coordinates) AS FLOAT))) *
              cos(radians(CAST(ST_X(location.coordinates) AS FLOAT)) - radians(:lon)) +
              sin(radians(:lat)) * 
              sin(radians(CAST(ST_Y(location.coordinates) AS FLOAT)))
            ) <= :radiusInMeters
          `, {
            lat,
            lon,
            radiusInMeters
          })
          .getMany();
      }
}