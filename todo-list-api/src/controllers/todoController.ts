import { Request, Response } from "express";
import { connectDB } from "../db";

export const getTodos = async (_req: Request, res: Response) => {
  const db = await connectDB();
  const todos = await db.all("SELECT * FROM todos");
  res.json(todos);
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  const db = await connectDB();
  const result = await db.run("INSERT INTO todos (title) VALUES (?)", [title]);
  res.json({ id: result.lastID, title, completed: 0 });
};

export const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const db = await connectDB();
  await db.run("UPDATE todos SET title = ?, completed = ? WHERE id = ?", [
    title,
    completed ? 1 : 0,
    id,
  ]);
  res.sendStatus(204);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;
  const db = await connectDB();
  await db.run("DELETE FROM todos WHERE id = ?", id);
  res.sendStatus(204);
};
