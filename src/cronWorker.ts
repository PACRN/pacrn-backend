import { parentPort } from "worker_threads";
import cron, { ScheduledTask } from 'node-cron'
import dotenv from 'dotenv';
import { AppDataSource } from "./utilities/data-source";
import fetchAndProcessProviders from "./utilities/job/cronJobGoogleReview";
import { Container } from 'typedi';
import { DataSource } from 'typeorm';
import validateEnv from "./utilities/validateEnv";

// Load environment variables
dotenv.config();

let cronJob: ScheduledTask;
let isJobRunning = false;

const executeCronJob = async () => {
    if (isJobRunning) {
        console.log("Previous job is still running. Skipping this execution.");
        return;
    }

    isJobRunning = true; // Lock the job

    try {
        console.log("Running provider fetch job...");
        const hasProviders = await fetchAndProcessProviders();
        if (!hasProviders) {
            console.log("No more providers. Stopping cron job.");
            cronJob.stop();
        }
    } catch (error) {
        console.error("Error executing cron job:", error);
    } finally {
        isJobRunning = false; // Unlock after job completion
    }
}

AppDataSource.initialize().then(async () => {
    console.log('Data Source has been initialized in the worker thread!');
    // VALIDATE ENV
    validateEnv();

    Container.set(DataSource, AppDataSource)

    cronJob = cron.schedule('*/1 * * * *', executeCronJob);

    parentPort?.on('message', (message) => {
        console.log("Message")
        if (message === 'stop') {
            cronJob.stop()
        }
    })
})
    .catch((err) => {
        console.error('Error during Data Source initialization in worker thread:', err);
    });