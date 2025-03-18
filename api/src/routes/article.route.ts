import { FastifyInstance } from 'fastify';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';

const uploadDir = './src/img_url';

export default async function articleRoutes(fastify: FastifyInstance) {
  fastify.get('/allArticles', async (request, reply) => {
    try {
      const result = await fastify.pg.query('SELECT id,nom,description,img_url FROM articles');
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

  const limit = 6;

  const offset = lastId ? lastId : 0;

  try {
    let query = '';
    if(offset === 0){
       query = 'SELECT id,nom,description,img_url FROM articles WHERE id > $1 ORDER BY id DESC LIMIT $2';
    }else{
      query = 'SELECT id,nom,description,img_url FROM articles WHERE id < $1 ORDER BY id DESC LIMIT $2';
    }

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

      // @ts-ignore
      const nom = request.body.nom.value
      // @ts-ignore
      const description = request.body.description.value
      // @ts-ignore
      const data = await request.body.image;
  
      if (!data) {
        return reply.status(400).send({ error: 'Aucun fichier reçu.' });
      }
      
      const filename = nom.replace(" ", "_");
      
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
      const query = 'INSERT INTO articles (nom, description, img_url) VALUES ($1, $2, $3) RETURNING id';
      const response = await fastify.pg.query(query, [nom, description, file]);
      const articleId = response.rows[0].id;
  
      return reply.code(200).send({ message: 'Article ajouté avec succès.',img_url: `http://localhost:5000/images/${file}`,id: articleId });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Database query error', details: (error as Error).message });
    }
})
  
}
