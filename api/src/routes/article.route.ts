import { FastifyInstance } from 'fastify';

export default async function articleRoutes(fastify: FastifyInstance) {
  fastify.get('/allArticles', async (request, reply) => {
    try {
      const result = await fastify.pg.query('SELECT * FROM articles');
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        reply.code(404).send({ message: 'No articles found' });
      }
    } catch (error) {
      reply.code(500).send({ error: 'Database query error', details: (error as Error).message });
    }
  });

  fastify.get('/articles', async (request, reply) => {
    const lastId = (request.query as { lastId?: string }).lastId
    ? parseInt((request.query as { lastId?: string }).lastId as string)
    : 0;

  const limit = 10;

  const offset = lastId ? lastId : 0;

  try {
    const query = 'SELECT * FROM articles WHERE id > $1 ORDER BY id LIMIT $2';
    const result = await fastify.pg.query(query, [offset, limit]);
      if (result.rows.length > 0) {
        return result.rows;
      } else {
        reply.code(404).send({ message: 'No articles found' });
      }
    } catch (error) {
      reply.code(500).send({ error: 'Database query error', details: (error as Error).message });
    }
  });
}
