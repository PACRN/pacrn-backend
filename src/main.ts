require('dotenv').config();
import express from 'express';
import config from 'config';
import { AppDataSource } from './utilities/data-source';
import validateEnv from './utilities/validateEnv';
import { loadMonitoringModule } from './utilities/swaggerStats';
import routeConfiguration from './api';
import { handleGlobalErrors, healthCheck, useCors, useLogger } from './utilities/service-config';
import 'reflect-metadata';
import Container from 'typedi';
import { DataSource } from 'typeorm';

AppDataSource.initialize().then(async () => {
  // VALIDATE ENV
  validateEnv();

  Container.set(DataSource, AppDataSource)

  const app = express();

  app.use(express.json({ limit: '1000kb' }));

  await useLogger(app);

  await useCors(app);

  await loadMonitoringModule(app);

  await routeConfiguration(app);

  await healthCheck(app);

  await handleGlobalErrors(app);

  const port = config.get<number>('port');
  
  app.listen(port);

  console.log(`Server started with pid: ${process.pid} on port: ${port}`);
}).catch((e) => console.log(e))


