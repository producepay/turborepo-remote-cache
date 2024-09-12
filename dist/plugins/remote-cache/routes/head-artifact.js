import { badRequest, notFound } from '@hapi/boom';
import { artifactsRouteSchema, } from './schema.js';
export const headArtifact = {
    method: 'HEAD',
    url: '/artifacts/:id',
    schema: artifactsRouteSchema,
    async handler(req, reply) {
        const artifactId = req.params.id;
        const team = req.query.teamId ?? req.query.team ?? req.query.slug;
        if (!team) {
            throw badRequest(`querystring should have required property 'team'`);
        }
        try {
            const artifact = await this.location.existsCachedArtifact(artifactId, team);
            reply.send(artifact);
        }
        catch (err) {
            throw notFound('Artifact not found', err);
        }
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZC1hcnRpZmFjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wbHVnaW5zL3JlbW90ZS1jYWNoZS9yb3V0ZXMvaGVhZC1hcnRpZmFjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQU1qRCxPQUFPLEVBR0wsb0JBQW9CLEdBQ3JCLE1BQU0sYUFBYSxDQUFBO0FBRXBCLE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FRckI7SUFDRixNQUFNLEVBQUUsTUFBTTtJQUNkLEdBQUcsRUFBRSxnQkFBZ0I7SUFDckIsTUFBTSxFQUFFLG9CQUFvQjtJQUM1QixLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLO1FBQ3RCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFBO1FBQ2hDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFBO1FBQ2pFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNWLE1BQU0sVUFBVSxDQUFDLGtEQUFrRCxDQUFDLENBQUE7UUFDdEUsQ0FBQztRQUVELElBQUksQ0FBQztZQUNILE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FDdkQsVUFBVSxFQUNWLElBQUksQ0FDTCxDQUFBO1lBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN0QixDQUFDO1FBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLE1BQU0sUUFBUSxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQzNDLENBQUM7SUFDSCxDQUFDO0NBQ0YsQ0FBQSJ9