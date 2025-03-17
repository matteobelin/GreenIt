import fastify from 'fastify'
import userRoutes from './routes/user.route'
import articleRoutes from './routes/article.route'
import fastifyPostgres from 'fastify-postgres';


const app = fastify();

app.register(fastifyPostgres, {
  connectionString: 'postgres://user:password@localhost:5432/mydb', 
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

