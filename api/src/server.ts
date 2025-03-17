import fastify from 'fastify'
import userRoutes from './routes/user.route'
import articleRoutes from './routes/article.route'


const app = fastify();

app.register(userRoutes);
app.register(articleRoutes);



app.listen({ port: 5000, host: '0.0.0.0' }, (err: Error | null) => { 
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server running on http://localhost:5000");
})

