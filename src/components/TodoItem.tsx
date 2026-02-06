"use client";

import { useState, useRef, useEffect } from "react";

import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const startEditing = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const saveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  };

  return (
    <li className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="h-5 w-5 shrink-0 cursor-pointer rounded border-gray-300 accent-blue-500"
      />

      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={saveEdit}
          className="flex-1 rounded border border-blue-300 px-2 py-1 text-gray-800 focus:outline-none"
        />
      ) : (
        <span
          onDoubleClick={startEditing}
          className={`flex-1 cursor-pointer ${
            todo.completed ? "text-gray-400 line-through" : "text-gray-800"
          }`}
        >
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <button
          onClick={startEditing}
          className="shrink-0 cursor-pointer rounded px-2 py-1 text-gray-400 hover:bg-blue-50 hover:text-blue-500"
          title="수정"
        >
          &#9998;
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="shrink-0 cursor-pointer rounded px-2 py-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
      >
        &times;
      </button>
    </li>
  );
}
