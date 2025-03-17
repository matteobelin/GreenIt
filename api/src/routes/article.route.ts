import { FastifyInstance } from 'fastify';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const uploadDir = './src/img_url';

export default async function articleRoutes(fastify: FastifyInstance) {
  fastify.get('/allArticles', async (request, reply) => {
    try {
      const result = await fastify.pg.query('SELECT * FROM articles');
      if (result.rows.length === 0) {
        return reply.code(404).send({ message: 'No articles found' });
      }
  
      const articlesWithFullUrl = result.rows.map((article: { img_url: string }) => ({
        ...article,
        img_url: `http://localhost:5000/images/${article.img_url}`,
    }));
    reply.code(200).send(articlesWithFullUrl);
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
    if (result.rows.length === 0) {
      return reply.code(404).send({ message: 'No articles found' });
    }
    const articlesWithFullUrl = result.rows.map((article: { img_url: string }) => ({
      ...article,
      img_url: `http://localhost:5000/images/${article.img_url}`,
    }));
  reply.code(200).send(articlesWithFullUrl);
    } catch (error) {
      reply.code(500).send({ error: 'Database query error', details: (error as Error).message });
    }
  });




  fastify.post('/articles', async (request, reply) => {
    try {
      const data = await request.file();
      
      if (!data) {
        return reply.status(400).send({ error: 'Aucun fichier reçu.' });
      }
      const { name, description } = request.body as { name: string, description: string }; 
      const filename = name.replace(" ", "_");
      
      if (data.file.truncated) {
        return reply.status(400).send({ error: 'Fichier trop volumineux.' });
      }
  
      const fileExtension = path.extname(data.filename).toLowerCase();
      let uploadPath = path.join(uploadDir, `${filename}${fileExtension}`);
      const file =`${filename}.webp`
      if (fileExtension !== '.webp') {
        
        const webpFilePath = path.join(uploadDir, file);
        
        const fileBuffer = await data.toBuffer();
        await sharp(fileBuffer)
          .webp() 
          .resize(1200, 800)
          .toFile(webpFilePath); 
  
        uploadPath = webpFilePath; 
      } else {
        const writeStream = fs.createWriteStream(uploadPath);
        data.file.pipe(writeStream);
      }
      const query = 'INSERT INTO articles (name, description, img_url) VALUES ($1, $2, $3) RETURNING *';
      await fastify.pg.query(query, [name, description, file]);
  
      return reply.code(200).send({ message: 'Article ajouté avec succès.' });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Database query error', details: (error as Error).message });
    }
})
  
}
