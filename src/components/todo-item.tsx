import { ChangeEvent, memo, useCallback } from "react";

import useTodoStore from "store";
import { TodoEntry } from "types";

// Isn't gonna change
const { checkTodo, deleteTodo } = useTodoStore.getState();

const TodoItem = ({ checked, content, id }: TodoEntry) => {
  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.checked) return;

      checkTodo(id);
    },
    [id],
  );

  const handleDelete = useCallback(() => {
    deleteTodo(id);
  }, [id]);

  return (
    <div key={id} className="flex gap-3">
      <span>{id}</span>
      <span>{content}</span>
      <button onClick={handleDelete}>delete</button>
      <input type="checkbox" checked={checked} onChange={handleOnChange} />
    </div>
  );
};

const TodoItemMemoized = memo(
  TodoItem,
  (prev, next) => prev.checked === next.checked,
);

export default TodoItemMemoized;
