import { Worker } from 'worker_threads';
import os from 'os';

interface Location {
    address: string;
    lat: number;
    lon: number;
}

const currentLocation: Location = {
    lat: 37.7749, // Example: San Francisco, CA
    lon: -122.4194,
    address: 'San Francisco, CA'
};

const locations: Location[] = [
    // Add your list of locations here
];

// Convert 5 miles to kilometers
const radiusInKm = 5 * 1.60934; 

// Dynamically determine the number of workers based on the number of CPU cores
const maxWorkers = os.cpus().length; // Maximum workers based on CPU cores
let numWorkers = Math.min(locations.length, maxWorkers); // Adjust based on data size

if (locations.length < numWorkers) {
    numWorkers = 1; // Only one worker if the dataset is small
}

const chunkSize = Math.ceil(locations.length / numWorkers);
const locationChunks = [];

for (let i = 0; i < numWorkers; i++) {
    locationChunks.push(locations.slice(i * chunkSize, (i + 1) * chunkSize));
}

// Function to run the worker
function runWorker(workerData: any): Promise<Location[]> {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./distanceWorker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', (code) => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    });
}

// Run workers in parallel using Promise.all
Promise.all(locationChunks.map(chunk => runWorker({ currentLocation, locations: chunk, radiusInKm })))
    .then(results => {
        const nearbyLocations = results.flat();
        console.log('Nearby Locations:', nearbyLocations);
    })
    .catch(err => {
        console.error('Error:', err);
    });
