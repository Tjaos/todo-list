import express from 'express';
import cors from 'cors';
import todoRoutes  from './routes/todos';

const app = express();


app.use(express.json());
app.use(cors());


const PORT = 3001;

app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});