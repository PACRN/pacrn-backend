import { Client } from 'minio';
import process from 'process';
import { urlConcatinator } from './helpers';

export default class Minio {

    public static minio_client: Client;

    static async initialize() {
        this.minio_client = new Client({
            accessKey: process.env.MINIO_ACCESS_KEY,
            secretKey: process.env.MINIO_SECRET_KEY,
            endPoint: process.env.MINIO_ENDPOINT,
            port: parseInt(process.env.MINIO_ENDPOINT_PORT),
            useSSL: false
        });
    }

    static async uploadFileToMinio(file) {
        await Minio.minio_client.fPutObject(process.env.MINIO_BUCKET, file?.originalname, file?.path);
        return urlConcatinator([process.env.MINIO_BASE_URL, process.env.MINIO_BUCKET, file?.originalname], "/");
    }

}