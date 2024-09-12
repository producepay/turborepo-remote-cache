import { badRequest, notFound } from '@hapi/boom';
import { artifactsRouteSchema, } from './schema.js';
export const getArtifact = {
    method: 'GET',
    exposeHeadRoute: false,
    url: '/artifacts/:id',
    schema: artifactsRouteSchema,
    async handler(req, reply) {
        const artifactId = req.params.id;
        const team = req.query.teamId ?? req.query.team ?? req.query.slug;
        if (!team) {
            throw badRequest(`querystring should have required property 'team'`);
        }
        try {
            const artifact = await this.location.getCachedArtifact(artifactId, team);
            reply.header('Content-Type', 'application/octet-stream');
            return reply.send(artifact);
        }
        catch (err) {
            throw notFound('Artifact not found', err);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFydGlmYWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BsdWdpbnMvcmVtb3RlLWNhY2hlL3JvdXRlcy9nZXQtYXJ0aWZhY3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFNakQsT0FBTyxFQUdMLG9CQUFvQixHQUNyQixNQUFNLGFBQWEsQ0FBQTtBQUVwQixNQUFNLENBQUMsTUFBTSxXQUFXLEdBUXBCO0lBQ0YsTUFBTSxFQUFFLEtBQUs7SUFDYixlQUFlLEVBQUUsS0FBSztJQUN0QixHQUFHLEVBQUUsZ0JBQWdCO0lBQ3JCLE1BQU0sRUFBRSxvQkFBb0I7SUFDNUIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSztRQUN0QixNQUFNLFVBQVUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNoQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQTtRQUNqRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDVixNQUFNLFVBQVUsQ0FBQyxrREFBa0QsQ0FBQyxDQUFBO1FBQ3RFLENBQUM7UUFFRCxJQUFJLENBQUM7WUFDSCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBQ3hFLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLDBCQUEwQixDQUFDLENBQUE7WUFDeEQsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzdCLENBQUM7UUFBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsTUFBTSxRQUFRLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUE7UUFDM0MsQ0FBQztJQUNILENBQUM7Q0FDRixDQUFBIn0=