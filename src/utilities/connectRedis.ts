import { createClient } from 'redis';

const redisUrl = `redis://${process.env.POSTGRES_HOST}:${process.env.REDIS_URL_PORT}`;

export const redisClient = createClient({
  url: redisUrl,
});

export const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connect successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

