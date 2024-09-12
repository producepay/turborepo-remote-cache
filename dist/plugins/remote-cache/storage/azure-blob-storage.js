import { PassThrough } from 'node:stream';
import { BlobServiceClient } from '@azure/storage-blob';
export function createAzureBlobStorage({ containerName, connectionString, }) {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    return {
        exists: (artifactPath, cb) => {
            const blobClient = containerClient.getBlobClient(artifactPath);
            blobClient.exists().then((exists) => {
                cb(null, exists);
            }, cb);
        },
        createReadStream(artifactPath) {
            const blobClient = containerClient.getBlobClient(artifactPath);
            const stream = new PassThrough();
            blobClient.download().then((response) => {
                if (response.readableStreamBody) {
                    response.readableStreamBody.pipe(stream);
                }
            });
            return stream;
        },
        createWriteStream(artifactPath) {
            const blockBlobClient = containerClient.getBlockBlobClient(artifactPath);
            const stream = new PassThrough();
            blockBlobClient.uploadStream(stream);
            return stream;
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXp1cmUtYmxvYi1zdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BsdWdpbnMvcmVtb3RlLWNhY2hlL3N0b3JhZ2UvYXp1cmUtYmxvYi1zdG9yYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUE7QUFRdkQsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEVBQ3JDLGFBQWEsRUFDYixnQkFBZ0IsR0FDUTtJQUN4QixNQUFNLGlCQUFpQixHQUNyQixpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO0lBQzFELE1BQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFBO0lBRTNFLE9BQU87UUFDTCxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDM0IsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUM5RCxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQ2xDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDbEIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBQ1IsQ0FBQztRQUNELGdCQUFnQixDQUFDLFlBQVk7WUFDM0IsTUFBTSxVQUFVLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtZQUM5RCxNQUFNLE1BQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBO1lBQ2hDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxRQUFRLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDaEMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDMUMsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxNQUFNLENBQUE7UUFDZixDQUFDO1FBQ0QsaUJBQWlCLENBQUMsWUFBWTtZQUM1QixNQUFNLGVBQWUsR0FBRyxlQUFlLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUE7WUFDeEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQTtZQUNoQyxlQUFlLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1lBQ3BDLE9BQU8sTUFBTSxDQUFBO1FBQ2YsQ0FBQztLQUNGLENBQUE7QUFDSCxDQUFDIn0=