import { Router } from 'express';
import { connectDB } from '../db';
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
} from '../controllers/todoController';

const router = Router();

router.get('/', async (_, res) => {
  const db = await connectDB();
  const todos = await db.all('SELECT * FROM todos');
  res.json(todos);
});

router.post('/', async (req, res) => {
  const { title } = req.body;
  const db = await connectDB();
  const result = await db.run('INSERT INTO todos (title) VALUES (?)', [title]);
  res.json({ id: result.lastID, title });
});

router.put('/:id', async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;
  const db = await connectDB();
  await db.run('UPDATE todos SET title = ? WHERE id = ?', [title, id]);
  res.sendStatus(200);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const db = await connectDB();
  await db.run('DELETE FROM todos WHERE id = ?', [id]);
  res.sendStatus(200);
});

export default router;
