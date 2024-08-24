import { Provider } from "../modules/entities/providers.entities";
import { GeoType } from "./geoType";

export interface WorkerData {
    currentLocation: GeoType;
    locations: Provider[];
    radiusInKm: number;
}