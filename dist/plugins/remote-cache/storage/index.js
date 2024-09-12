import { join } from 'path';
import { pipeline as pipelineCallback } from 'stream';
import { promisify } from 'util';
import { STORAGE_PROVIDERS } from '../../../env.js';
import { createAzureBlobStorage, } from './azure-blob-storage.js';
import { createGoogleCloudStorage, } from './google-cloud-storage.js';
import { createLocal } from './local.js';
import { createS3 } from './s3.js';
const pipeline = promisify(pipelineCallback);
const TURBO_CACHE_FOLDER_NAME = 'turborepocache';
const TURBO_CACHE_USE_TMP_FOLDER = true;
function createStorageLocation(provider, providerOptions) {
    const { path = TURBO_CACHE_FOLDER_NAME, useTmp = TURBO_CACHE_USE_TMP_FOLDER, } = providerOptions;
    switch (provider) {
        case STORAGE_PROVIDERS.LOCAL: {
            return createLocal({ path, useTmp });
        }
        case STORAGE_PROVIDERS.S3:
        case STORAGE_PROVIDERS.s3: {
            const { accessKey, secretKey, region, endpoint } = providerOptions;
            return createS3({ accessKey, secretKey, bucket: path, region, endpoint });
        }
        case STORAGE_PROVIDERS.MINIO: {
            const { accessKey, secretKey, region, endpoint } = providerOptions;
            return createS3({
                accessKey,
                secretKey,
                bucket: path,
                region,
                endpoint,
                s3OptionsPassthrough: {
                    forcePathStyle: true,
                },
            });
        }
        case STORAGE_PROVIDERS.GOOGLE_CLOUD_STORAGE: {
            const { clientEmail, privateKey, projectId } = providerOptions;
            return createGoogleCloudStorage({
                bucket: path,
                clientEmail,
                privateKey,
                projectId,
            });
        }
        case STORAGE_PROVIDERS.AZURE_BLOB_STORAGE: {
            const { connectionString } = providerOptions;
            return createAzureBlobStorage({ containerName: path, connectionString });
        }
        default:
            throw new Error(`Unsupported storage provider '${provider}'. Please select one of the following: ${Object.values(STORAGE_PROVIDERS).join(', ')}!`);
    }
}
export function createLocation(provider, providerOptions) {
    const location = createStorageLocation(provider, providerOptions);
    async function getCachedArtifact(artifactId, team) {
        return new Promise((resolve, reject) => {
            const artifactPath = join(team, artifactId);
            location.exists(artifactPath, (err, exists) => {
                if (err) {
                    return reject(err);
                }
                if (!exists) {
                    return reject(new Error(`Artifact ${artifactPath} doesn't exist.`));
                }
                resolve(location.createReadStream(artifactPath));
            });
        });
    }
    async function existsCachedArtifact(artifactId, team) {
        return new Promise((resolve, reject) => {
            const artifactPath = join(team, artifactId);
            location.exists(artifactPath, (err, exists) => {
                if (err) {
                    return reject(err);
                }
                if (!exists) {
                    return reject(new Error(`Artifact ${artifactPath} doesn't exist.`));
                }
                resolve();
            });
        });
    }
    async function createCachedArtifact(artifactId, team, artifact) {
        return pipeline(artifact, location.createWriteStream(join(team, artifactId)));
    }
    return {
        getCachedArtifact,
        createCachedArtifact,
        existsCachedArtifact,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGx1Z2lucy9yZW1vdGUtY2FjaGUvc3RvcmFnZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sTUFBTSxDQUFBO0FBQzNCLE9BQU8sRUFBWSxRQUFRLElBQUksZ0JBQWdCLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0QsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLE1BQU0sQ0FBQTtBQUNoQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQTtBQUNuRCxPQUFPLEVBRUwsc0JBQXNCLEdBQ3ZCLE1BQU0seUJBQXlCLENBQUE7QUFDaEMsT0FBTyxFQUVMLHdCQUF3QixHQUN6QixNQUFNLDJCQUEyQixDQUFBO0FBQ2xDLE9BQU8sRUFBa0MsV0FBVyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ3hFLE9BQU8sRUFBNEIsUUFBUSxFQUFFLE1BQU0sU0FBUyxDQUFBO0FBRTVELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQzVDLE1BQU0sdUJBQXVCLEdBQUcsZ0JBQXlCLENBQUE7QUFDekQsTUFBTSwwQkFBMEIsR0FBRyxJQUFhLENBQUE7QUE2QmhELFNBQVMscUJBQXFCLENBQzVCLFFBQWtCLEVBQ2xCLGVBQTBDO0lBRTFDLE1BQU0sRUFDSixJQUFJLEdBQUcsdUJBQXVCLEVBQzlCLE1BQU0sR0FBRywwQkFBMEIsR0FDcEMsR0FBRyxlQUFlLENBQUE7SUFFbkIsUUFBUSxRQUFRLEVBQUUsQ0FBQztRQUNqQixLQUFLLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDN0IsT0FBTyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQTtRQUN0QyxDQUFDO1FBQ0QsS0FBSyxpQkFBaUIsQ0FBQyxFQUFFLENBQUM7UUFD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