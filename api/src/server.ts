import fastify from 'fastify'
import userRoutes from './routes/user.route'
import articleRoutes from './routes/article.route'
import fastifyPostgres from 'fastify-postgres';
import fastifyMultipart from '@fastify/multipart';
import path from 'path';
import fastifyStatic from '@fastify/static';
import fastifyCors from '@fastify/cors';


const app = fastify();
const imageDir = path.join(__dirname, '/img_url');

app.register(fastifyCors, {
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'],
});

app.register(fastifyPostgres, {
  connectionString: 'postgres://user:password@localhost:5432/mydb', 
});

app.register(fastifyStatic, {
  root: imageDir,
  prefix: '/images/',
});

app.register(fastifyMultipart, {
  attachFieldsToBody: true,
  limits: { 
    fileSize: 5 * 1024 * 1024,  
    files: 1,            
  }
});


app.register(userRoutes);
app.register(articleRoutes);



app.listen({ port: 5000, host: '0.0.0.0' }, (err: Error | null) => { 
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server running on http://localhost:5000");
})




