import fp from 'fastify-plugin';
import { env } from '../env.js';
export default fp(async function (fastify) {
    fastify.decorate('config', env.get());
}, { name: 'config' });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3BsdWdpbnMvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFBO0FBQy9CLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFFL0IsZUFBZSxFQUFFLENBQ2YsS0FBSyxXQUFXLE9BQU87SUFDckIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7QUFDdkMsQ0FBQyxFQUNELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUNuQixDQUFBIn0=