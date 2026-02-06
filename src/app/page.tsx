"use client";

import { useState, useEffect } from "react";

import { TodoInput } from "@/components/TodoInput";
import { TodoFilter } from "@/components/TodoFilter";
import { TodoList } from "@/components/TodoList";

import type { Todo, FilterType } from "@/types/todo";

const STORAGE_KEY = "todo-app-todos";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos, isLoaded]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remainingCount = todos.filter((t) => !t.completed).length;

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-12">
        <p className="text-gray-400">로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 py-12">
      <main className="w-full max-w-lg">
        <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
          Todo App
        </h1>

        <div className="flex flex-col gap-5">
          <TodoInput onAdd={addTodo} />

          <div className="flex items-center justify-between">
            <TodoFilter current={filter} onChange={setFilter} />
            <span className="text-sm text-gray-500">
              남은 할 일: {remainingCount}개
            </span>
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
      </main>
    </div>
  );
}
