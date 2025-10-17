import { ChangeEvent, memo, useCallback } from "react";

import useTodoStore from "store";
import { TodoEntry } from "types";

import { CheckBoxComponent, DeleteIcon } from "./components";

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

  const checkedClassName = checked ? "opacity-50" : "";
  const checkedTextClassName = checked ? "line-through" : "";

  return (
    <div
      key={id}
      className={`shadow-input flex w-full items-center gap-3 rounded-full bg-input-background px-4 py-3 ${checkedClassName}`}>
      <CheckBoxComponent checked={checked} onChange={handleOnChange} />
      <span className={checkedTextClassName}>{content}</span>
      <DeleteIcon onClick={handleDelete} id={id} />
    </div>
  );
};

const TodoItemMemoized = memo(
  TodoItem,
  (prev, next) => prev.checked === next.checked,
);

export default TodoItemMemoized;
