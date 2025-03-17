import { FastifyInstance } from 'fastify'

export default async function articleRoutes(fastify: FastifyInstance) {
    fastify.get('/articles', async (request, reply) =>{
        return { article: 'article' }
    });
  }