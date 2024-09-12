import { Readable } from 'stream';
import { badRequest, preconditionFailed } from '@hapi/boom';
import { artifactsRouteSchema, } from './schema.js';
export const putArtifact = {
    url: '/artifacts/:id',
    method: 'PUT',
    schema: artifactsRouteSchema,
    async handler(req, reply) {
        const artifactId = req.params.id;
        const team = req.query.teamId ?? req.query.team ?? req.query.slug;
        if (!team) {
            throw badRequest(`querystring should have required property 'team'`);
        }
        try {
            await this.location.createCachedArtifact(artifactId, team, Readable.from(req.body));
            reply.send({ urls: [`${team}/${artifactId}`] });
        }
        catch (err) {
            throw preconditionFailed('Error during the artifact creation', err);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHV0LWFydGlmYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BsdWdpbnMvcmVtb3RlLWNhY2hlL3JvdXRlcy9wdXQtYXJ0aWZhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUNqQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGtCQUFrQixFQUFFLE1BQU0sWUFBWSxDQUFBO0FBTTNELE9BQU8sRUFHTCxvQkFBb0IsR0FDckIsTUFBTSxhQUFhLENBQUE7QUFFcEIsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQVNwQjtJQUNGLEdBQUcsRUFBRSxnQkFBZ0I7SUFDckIsTUFBTSxFQUFFLEtBQUs7SUFDYixNQUFNLEVBQUUsb0JBQW9CO0lBQzVCLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUs7UUFDdEIsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUE7UUFDaEMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUE7UUFDakUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1YsTUFBTSxVQUFVLENBQUMsa0RBQWtELENBQUMsQ0FBQTtRQUN0RSxDQUFDO1FBRUQsSUFBSSxDQUFDO1lBQ0gsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUN0QyxVQUFVLEVBQ1YsSUFBSSxFQUNKLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUN4QixDQUFBO1lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLFVBQVUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2pELENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBRWIsTUFBTSxrQkFBa0IsQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUNyRSxDQUFDO0lBQ0gsQ0FBQztDQUNGLENBQUEifQ==