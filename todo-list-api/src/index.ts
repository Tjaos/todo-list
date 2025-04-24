import express from 'express';
import cors from 'cors';
import todoRoutes from './routes/todos';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});