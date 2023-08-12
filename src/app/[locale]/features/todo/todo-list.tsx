"use client";

import { Trash } from "lucide-react";

import { Button } from "~/islands/ui/button";
import { Checkbox } from "~/islands/ui/checkbox";

import { TodoListStyles } from "./styles";
import { type Todo } from "./todo";

type TodoListProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export function TodoList({ todos, setTodos }: TodoListProps) {
  function handleCompleteTodo(id: string) {
    setTodos(
      todos.map((todo) =>
        todo.id !== id
          ? todo
          : {
              ...todo,
              completedAt: todo.completedAt ? null : new Date().toISOString(),
            },
      ),
    );
  }

  function handleDeleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="mt-6 space-y-3">
      {todos.map((todo) => (
        <div
          className="flex w-1/2 justify-between rounded-md border p-4"
          key={todo.id}
        >
          <h3
            className={TodoListStyles.Title({
              isCompleted: !!todo.completedAt,
            })}
          >
            {todo.title}
          </h3>
          <div className="flex items-center gap-2">
            <Checkbox
              className="h-6 w-6"
              checked={!!todo.completedAt}
              onCheckedChange={() => handleCompleteTodo(todo.id)}
              aria-label="Complete task"
            />
            <Button
              className="h-6 w-6 p-0"
              variant="destructive"
              aria-label="Delete task"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
