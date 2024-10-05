import { DataSource } from "typeorm";
import { BaseRepository } from "./base.repository";
import { Service, Inject } from 'typedi';
import { ProviderImage } from "../entities/providerImage.entities";

@Service()
export class ImageRepository extends BaseRepository<ProviderImage> {
    constructor(@Inject(() => DataSource) dataSource: DataSource) {
        super(ProviderImage, dataSource);
    }
}