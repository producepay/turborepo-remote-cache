import { badRequest, unauthorized } from '@hapi/boom';
import { STORAGE_PROVIDERS } from '../../env.js';
import { artifactsEvents, getArtifact, getStatus, headArtifact, putArtifact, } from './routes/index.js';
import { createLocation } from './storage/index.js';
async function turboRemoteCache(instance, options) {
    const bodyLimit = instance.config.BODY_LIMIT;
    const { allowedTokens, apiVersion = 'v8', provider = STORAGE_PROVIDERS.LOCAL, } = options;
    if (!(Array.isArray(allowedTokens) && allowedTokens.length)) {
        throw new Error(`'allowedTokens' options must be a string[], ${typeof allowedTokens} provided instead`);
    }
    instance.addContentTypeParser('application/octet-stream', { parseAs: 'buffer', bodyLimit }, async function parser(request, payload) {
        return payload;
    });
    instance.decorate('location', createLocation(provider, {
        accessKey: instance.config.S3_ACCESS_KEY,
        secretKey: instance.config.S3_SECRET_KEY,
        path: instance.config.STORAGE_PATH,
        region: instance.config.S3_REGION,
        endpoint: instance.config.S3_ENDPOINT,
        clientEmail: instance.config.GCS_CLIENT_EMAIL,
        privateKey: instance.config.GCS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        projectId: instance.config.GCS_PROJECT_ID,
        useTmp: !!instance.config.STORAGE_PATH_USE_TMP_FOLDER,
        connectionString: instance.config.ABS_CONNECTION_STRING,
    }));
    await instance.register(async function (i) {
        const tokens = new Set(allowedTokens);
        i.addHook('onRequest', async function (request) {
            let authHeader = request.headers.authorization;
            authHeader = Array.isArray(authHeader) ? authHeader.join() : authHeader;
            if (!authHeader) {
                throw badRequest('Missing Authorization header');
            }
            const [, token] = authHeader.split('Bearer ');
            if (!tokens.has(token)) {
                throw unauthorized('Invalid authorization token');
            }
        });
        i.route(getArtifact);
        i.route(headArtifact);
        i.route(putArtifact);
        i.route(artifactsEvents);
    }, { prefix: `/${apiVersion}` });
    await instance.register(async (i) => {
        i.route(getStatus);
    }, { prefix: `/${apiVersion}` });
}
export default turboRemoteCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGx1Z2lucy9yZW1vdGUtY2FjaGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFFckQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sY0FBYyxDQUFBO0FBQ2hELE9BQU8sRUFDTCxlQUFlLEVBQ2YsV0FBVyxFQUNYLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxHQUNaLE1BQU0sbUJBQW1CLENBQUE7QUFDMUIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFBO0FBRW5ELEtBQUssVUFBVSxnQkFBZ0IsQ0FDN0IsUUFBeUIsRUFDekIsT0FJQztJQUVELE1BQU0sU0FBUyxHQUFXLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFBO0lBQ3BELE1BQU0sRUFDSixhQUFhLEVBQ2IsVUFBVSxHQUFHLElBQUksRUFDakIsUUFBUSxHQUFHLGlCQUFpQixDQUFDLEtBQUssR0FDbkMsR0FBRyxPQUFPLENBQUE7SUFDWCxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQzVELE1BQU0sSUFBSSxLQUFLLENBQ2IsK0NBQStDLE9BQU8sYUFBYSxtQkFBbUIsQ0FDdkYsQ0FBQTtJQUNILENBQUM7SUFFRCxRQUFRLENBQUMsb0JBQW9CLENBQzNCLDBCQUEwQixFQUMxQixFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQ2hDLEtBQUssVUFBVSxNQUFNLENBQUMsT0FBTyxFQUFFLE9BQU87UUFDcEMsT0FBTyxPQUFPLENBQUE7SUFDaEIsQ0FBQyxDQUNGLENBQUE7SUFFRCxRQUFRLENBQUMsUUFBUSxDQUNmLFVBQVUsRUFDVixjQUFjLENBQUMsUUFBUSxFQUFFO1FBQ3ZCLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLGFBQWE7UUFDeEMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsYUFBYTtRQUN4QyxJQUFJLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZO1FBQ2xDLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVM7UUFDakMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVztRQUNyQyxXQUFXLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0I7UUFDN0MsVUFBVSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDO1FBQ2xFLFNBQVMsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWM7UUFDekMsTUFBTSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLDJCQUEyQjtRQUNyRCxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLHFCQUFxQjtLQUN4RCxDQUFDLENBQ0gsQ0FBQTtJQUVELE1BQU0sUUFBUSxDQUFDLFFBQVEsQ0FDckIsS0FBSyxXQUFXLENBQUM7UUFDZixNQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBUyxhQUFhLENBQUMsQ0FBQTtRQUU3QyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsT0FBTztZQUM1QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQTtZQUM5QyxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUE7WUFFdkUsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUNoQixNQUFNLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFBO1lBQ2xELENBQUM7WUFDRCxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzdDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sWUFBWSxDQUFDLDZCQUE2QixDQUFDLENBQUE7WUFDbkQsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUNwQixDQUFDLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3JCLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDcEIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUMxQixDQUFDLEVBQ0QsRUFBRSxNQUFNLEVBQUUsSUFBSSxVQUFVLEVBQUUsRUFBRSxDQUM3QixDQUFBO0lBRUQsTUFBTSxRQUFRLENBQUMsUUFBUSxDQUNyQixLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDVixDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3BCLENBQUMsRUFDRCxFQUFFLE1BQU0sRUFBRSxJQUFJLFVBQVUsRUFBRSxFQUFFLENBQzdCLENBQUE7QUFDSCxDQUFDO0FBRUQsZUFBZSxnQkFBZ0IsQ0FBQSJ9