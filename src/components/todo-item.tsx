import { memo } from "react";

import useTodoStore from "store";
import { TodoEntry } from "types";

// Isn't gonna change
const { checkTodo, deleteTodo } = useTodoStore.getState();

const TodoItem = ({ checked, content, id }: TodoEntry) => {
  return (
    <div key={id} className="flex gap-3">
      <span>{id}</span>
      <span>{content}</span>
      <button onClick={() => deleteTodo(id)}>delete</button>
      <input type="checkbox" checked={checked} onChange={() => checkTodo(id)} />
    </div>
  );
};

const TodoItemMemoized = memo(
  TodoItem,
  (prev, next) => prev.checked === next.checked,
);

export default TodoItemMemoized;
