import { promises as fs } from "fs";
import { MoreThan } from "typeorm";
import { AppDataSource } from "../data-source";
import { Provider } from "../../modules/entities/providers.entities";
import CreateReviewFromJobs from "../reivews/createReviewFromJob";

const FILE_PATH = "last_provider_id.txt"

const fetchAndProcessProviders = async (): Promise<boolean> => {
    try {
        const providerRepo = AppDataSource.getRepository(Provider)
        let lastFetchedId = 0;
        try {
            await fs.access(FILE_PATH); // Check if file exists
            const data = await fs.readFile(FILE_PATH, "utf8");
            lastFetchedId = parseInt(data, 10) || 0;
        } catch (err) {
            console.log("File not found. Creating file and starting from 0.");
            await fs.writeFile(FILE_PATH, "0", "utf8");
        }

        const providers = await providerRepo.find({
            where: { id: MoreThan(lastFetchedId) },
            select: ["id", "name", "code"],
            take: 10//set the value how many datas need to be fetched at give period of time
        })

        if (providers.length === 0) {
            console.log("No providers left.")
            await fs.writeFile(FILE_PATH, ""); // Clear the file
            return false;
        }

        for (const provider of providers) {
            await fs.writeFile(FILE_PATH, "");
            await fs.writeFile(FILE_PATH, provider.id.toString(), "utf8");
            try {
                await CreateReviewFromJobs(provider.name, provider.code);
            } catch (error) {
                console.error(`Skipping provider ID ${provider.id} due to an error:`, error);
            }
        }
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

export default fetchAndProcessProviders