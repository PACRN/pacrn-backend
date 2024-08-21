require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Provider } from '../modules/entities/providers.entities';
import { CareType } from '../modules/entities/careTypes.entities';
import { Cares } from '../modules/entities/cares.entities';
import { Tenant } from '../modules/entities/tenant.entities';
import { TenantConfigurations } from '../modules/entities/tenantConfigurations.entities';
import { Subscriptions } from '../modules/entities/subscriptions.entities';
import { Location } from '../modules/entities/location.entities';
import { Tags } from '../modules/entities/tags.entities';
import { Rating } from '../modules/entities/ratings.entities';
import { Review } from '../modules/entities/reviews.entities';
import { Reports } from '../modules/entities/reports.entities';
import { Customer } from '../modules/entities/customer.entities';
import { Wishlist } from '../modules/entities/wishlist.entities';


export const AppDataSource = new DataSource({
  name: 'default',
  host: process.env.POSTGRES_HOST,
  type: 'postgres',
  port: parseInt(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [Provider, CareType, Cares, 
    Tenant, TenantConfigurations, Subscriptions,
    Location, Tags, Rating, Review, Reports, Customer, Wishlist],
  // entities: ['src/modules/entities/*{.ts,.js}'],  
  migrations: [
    'src/migrations/*{.ts,.js}',
  ],
  synchronize: true
});


