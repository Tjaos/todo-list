"use client";
import api from "@/components/TodoItem";
import { Todo } from "@/types/todo";
import { useEffect, useState } from "react";
import "./globals.css";
import "./page.css";
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editTodoId, setEditTodoId] = useState<number | null>(null);
  const [editTodoTitle, setEditTodoTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await api.get("/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (!title.trim()) return;

    const response = await api.post("/todos", { title });
    setTodos([...todos, response.data]);
    setTitle("");
  };

  const deleteTodo = async (id: number) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const startEdit = (todo: Todo) => {
    setEditTodoId(todo.id);
    setEditTodoTitle(todo.title);
  };
  const cancelEdit = () => {
    setEditTodoId(null);
    setEditTodoTitle("");
  };

  const saveEdit = async (id: number) => {
    const todoToUpdate = todos.find((t) => t.id === id);
    if (!todoToUpdate) return;

    const updatedTodo = { ...todoToUpdate, title: editTodoTitle };
    await api.put(`/todos/${id}`, updatedTodo);

    setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    setEditTodoId(null);
    setEditTodoTitle("");
  };
  const toggleCompleted = async (todo: Todo) => {
    const updated = { ...todo, completed: !todo.completed };
    await api.put(`/todos/${todo.id}`, updated);
    setTodos(todos.map((t) => (t.id === todo.id ? updated : t)));
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <label htmlFor="todo-input">Adicione uma nova tarefa abaixo</label>
        <input
          id="todo-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button onClick={addTodo}>Adicionar</button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 && <li>Nenhuma tarefa encontrada</li>}
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <input
              className={"todo-checkbox"}
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompleted(todo)}
            />
            {editTodoId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTodoTitle}
                  onChange={(e) => setEditTodoTitle(e.target.value)}
                />
                <div className="todo-actions">
                    <button onClick={() => saveEdit(todo.id)} className="save-button">Salvar</button>
                    <button onClick={cancelEdit} className="delete-button">Cancelar</button>
                </div>
              </>
            ) : (
              <>
                {todo.title}
                <div className="todo-actions">
                  <button
                    className="edit-button"
                    onClick={() => startEdit(todo)}
                  >
                    Editar
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Excluir
                  </button>
                </div>

              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
