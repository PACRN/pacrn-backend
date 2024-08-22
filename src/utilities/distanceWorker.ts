import { parentPort } from 'worker_threads';

interface Location {
    address: string;
    lat: number;
    lon: number;
}

interface WorkerData {
    currentLocation: Location;
    locations: Location[];
    radiusInKm: number;
}

// Function to convert degrees to radians
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

// Listen for messages from the parent thread
parentPort?.on('message', (data: WorkerData) => {
    const { currentLocation, locations, radiusInKm } = data;
    const nearbyLocations = locations.filter(location => {
        const distance = getDistanceFromLatLonInKm(
            currentLocation.lat,
            currentLocation.lon,
            location.lat,
            location.lon
        );
        return distance <= radiusInKm;
    });

    // Send the result back to the parent thread
    parentPort?.postMessage(nearbyLocations);
});
