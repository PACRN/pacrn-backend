import { BlobServiceClient, ContainerClient, BlockBlobClient, BlobUploadCommonResponse } from '@azure/storage-blob';
import fs from 'fs';

class AzureBlobStorageHelper {
    private static blobServiceClient: BlobServiceClient;

    // Initialize the BlobServiceClient with the connection string constructed from environment variables
    static initialize() {
        const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
        const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

        if (!accountName || !accountKey) {
            throw new Error('Azure Storage Account Name and Account Key must be defined in environment variables.');
        }

        // Construct the connection string
        const azureConnectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=core.windows.net`;
            
        this.blobServiceClient = BlobServiceClient.fromConnectionString(azureConnectionString);
    }

    /**
     * Upload a file to Azure Blob Storage
     * @param containerName The name of the container to upload the file to
     * @param blobName The name of the blob (file) in Azure Blob Storage
     * @param filePath The local path of the file to upload
     */
    static async uploadFile(containerName: string, blobName: string, filePath: string): Promise<BlobUploadCommonResponse> {
        const containerClient: ContainerClient = this.blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists(); // Create container if it doesn't exist

        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

        const fileStream = fs.createReadStream(filePath);
        const fileStat = fs.statSync(filePath);

        console.log(`File uploaded to Azure Blob Storage: ${blobName}`);

        // Upload the file stream using BlockBlobClient
        return await blockBlobClient.uploadStream(fileStream, fileStat.size);
    }

    /**
     * Download a file from Azure Blob Storage
     * @param containerName The name of the container to download the file from
     * @param blobName The name of the blob (file) in Azure Blob Storage
     * @param downloadFilePath The local path to save the downloaded file
     */
    static async downloadFile(containerName: string, blobName: string, downloadFilePath: string): Promise<void> {
        const containerClient: ContainerClient = this.blobServiceClient.getContainerClient(containerName);
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        const fileStream = fs.createWriteStream(downloadFilePath);

        downloadBlockBlobResponse.readableStreamBody!.pipe(fileStream);

        fileStream.on('finish', () => {
            console.log(`File downloaded from Azure Blob Storage: ${blobName}`);
        });
    }

    /**
     * Create a folder in Azure Blob Storage
     * @param containerName The name of the container to create the folder in
     * @param folderName The name of the folder to create
     */
    static async createFolder(containerName: string, folderName: string): Promise<void> {
        const containerClient: ContainerClient = this.blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists(); // Create container if it doesn't exist

        // "Create" a folder by uploading a zero-byte blob with the folder name
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(`${folderName}/`); // Add a trailing slash to denote a folder
        await blockBlobClient.upload('', 0); // Upload an empty string as a zero-byte blob
        console.log(`Folder created in Azure Blob Storage: ${folderName}`);
    }

    /**
     * Download a file from a URL and upload it to Azure Blob Storage
     * @param url The URL of the file to download
     */
    static async downloadFileFromUrl(url: string): Promise<string> {
        // Parse the URL to extract containerName and blobName
        const parsedUrl = new URL(url);
        const accountName = parsedUrl.hostname.split('.')[0]; // Get account name from URL
        const [containerName, blobName] = parsedUrl.pathname.split('/').slice(1); // Extract containerName and blobName
        const containerClient: ContainerClient = this.blobServiceClient.getContainerClient(containerName);
        await containerClient.createIfNotExists(); // Create container if it doesn't exist
        const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blobName);

        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        const content = await this.streamToString(downloadBlockBlobResponse.readableStreamBody!);
        return content.toString('base64');
    }

     /**
     * Convert a readable stream to a string
     * @param readableStream The readable stream
     * @returns The content as a string
     */
     static async streamToString(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const chunks: any[] = [];
            readableStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
            readableStream.on('error', reject);
            readableStream.on('end', () => resolve(Buffer.concat(chunks)));
        });
    }
}

export default AzureBlobStorageHelper;
