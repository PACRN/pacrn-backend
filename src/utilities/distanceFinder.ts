import { Worker } from 'worker_threads';
import { WorkerData } from '../types/workerData';
import { GeoType } from '../types/geoType';
import { Provider } from '../modules/entities/providers.entities';

function deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
}

// Haversine formula to calculate the distance between two points
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}

export async function calculateNearest(currentLocation: GeoType, locations: Provider[], radiusInKm: number) {
    const distancePromises = locations.map(async (location) => {
        if (location.locations.length <= 0) {
            location.miles = 0;
            return null; // Filter out later
        }

        // Assume getDistanceFromLatLonInKm is an async function
        const distance = await getDistanceFromLatLonInKm(
            currentLocation.lat,
            currentLocation.lon,
            location.locations[0].latitude,
            location.locations[0].longitude
        );

        location.miles = parseFloat((distance / 1.60934).toFixed(2));

        // Return the location object if within the radius, otherwise null
        return distance <= radiusInKm ? location : null;
    });

    // Wait for all promises to resolve
    const results = await Promise.all(distancePromises);

    // Filter out null results
    return results.filter(location => location !== null);
}

// Function to run the worker
export function runWorker(workerData: WorkerData) {

    const worker = new Worker(__dirname + '/distanceWorker.js', { workerData });
    worker.on('message', (result) => console.log("here" + result));
    worker.on('error', (result) => console.log("here" + result));
    worker.on('exit', (code) => {
        if (code !== 0) new Error(`Worker stopped with exit code ${code}`);
    });

    // return new Promise((resolve, reject) => {
    //     const worker = new Worker(__dirname + '/distanceWorker.js', { workerData });
    //     worker.on('message', (result) => {
    //             resolve(result)
    //     });
    //     worker.on('error', (error) => {
    //         reject(error);
    //     });
    //     worker.on('exit', (code) => {
    //         if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
    //     });
    //     console.log("Worker script loaded");
    // });
}

// Run workers in parallel using Promise.all

