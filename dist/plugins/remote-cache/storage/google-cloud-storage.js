import GCS from '@google-cloud/storage';
function createStorage({ clientEmail, privateKey, projectId }) {
    if (!clientEmail || !privateKey || !projectId) {
        return new GCS.Storage();
    }
    else {
        return new GCS.Storage({
            projectId,
            credentials: {
                client_email: clientEmail,
                private_key: privateKey,
            },
        });
    }
}
export function createGoogleCloudStorage({ bucket, clientEmail, privateKey, projectId, }) {
    const storage = createStorage({
        clientEmail,
        privateKey,
        projectId,
    });
    const turboBucket = storage.bucket(bucket);
    return {
        exists: (artifactPath, cb) => {
            turboBucket.file(artifactPath).exists(cb);
        },
        createReadStream(artifactPath) {
            return turboBucket
                .file(artifactPath)
                .createReadStream();
        },
        createWriteStream(artifactPath) {
            return turboBucket.file(artifactPath).createWriteStream();
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZ2xlLWNsb3VkLXN0b3JhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGx1Z2lucy9yZW1vdGUtY2FjaGUvc3RvcmFnZS9nb29nbGUtY2xvdWQtc3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEdBQUcsTUFBTSx1QkFBdUIsQ0FBQTtBQVV2QyxTQUFTLGFBQWEsQ0FBQyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFO0lBQzNELElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM5QyxPQUFPLElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzFCLENBQUM7U0FBTSxDQUFDO1FBQ04sT0FBTyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUM7WUFDckIsU0FBUztZQUNULFdBQVcsRUFBRTtnQkFDWCxZQUFZLEVBQUUsV0FBVztnQkFDekIsV0FBVyxFQUFFLFVBQVU7YUFDeEI7U0FDRixDQUFDLENBQUE7SUFDSixDQUFDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSx3QkFBd0IsQ0FBQyxFQUN2QyxNQUFNLEVBQ04sV0FBVyxFQUNYLFVBQVUsRUFDVixTQUFTLEdBQ2lCO0lBQzFCLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUM1QixXQUFXO1FBQ1gsVUFBVTtRQUNWLFNBQVM7S0FDVixDQUFDLENBQUE7SUFFRixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBRTFDLE9BQU87UUFDTCxNQUFNLEVBQUUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDM0IsV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDM0MsQ0FBQztRQUNELGdCQUFnQixDQUFDLFlBQVk7WUFDM0IsT0FBTyxXQUFXO2lCQUNmLElBQUksQ0FBQyxZQUFZLENBQUM7aUJBQ2xCLGdCQUFnQixFQUF1QixDQUFBO1FBQzVDLENBQUM7UUFDRCxpQkFBaUIsQ0FBQyxZQUFZO1lBQzVCLE9BQU8sV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO1FBQzNELENBQUM7S0FDRixDQUFBO0FBQ0gsQ0FBQyJ9