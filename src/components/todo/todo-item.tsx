import { memo, useCallback } from "react";

import useTodoStore from "store";
import { TodoContent, TodoEntry } from "types";

import { useForm } from "react-hook-form";
import { CheckBoxComponent, DeleteIcon } from "./components";

// Isn't gonna change
const { checkTodo, deleteTodo, editTodo } = useTodoStore.getState();

const TodoItem = ({ checked, content, id }: TodoEntry) => {
  const { handleSubmit, register } = useForm<TodoContent>({
    defaultValues: {
      content,
    },
  });

  const handleEdit = (data: TodoContent) => {
    if (!data.content) return;

    editTodo(id, data.content);
  };

  const handleOnChange = useCallback(() => {
    checkTodo(id);
  }, [id]);

  const handleDelete = useCallback(() => {
    deleteTodo(id);
  }, [id]);

  const handleOnBlur = () => {
    handleSubmit(handleEdit);
  };

  const checkedClassName = checked ? "opacity-70" : "";
  const checkedTextClassNames = checked ? "line-through" : "";

  return (
    <div
      key={id}
      className={`flex w-full items-center gap-3 rounded-full bg-input-background px-4 py-3 shadow-input ${checkedClassName}`}
    >
      <CheckBoxComponent isChecked={checked} onChange={handleOnChange} />
      <form onSubmit={handleSubmit(handleEdit)} className="flex flex-1">
        <input
          {...register("content")}
          name="content"
          autoFocus
          onBlur={handleOnBlur}
          className={`flex w-full outline-0 ${checkedTextClassNames}`}
        />
      </form>
      <DeleteIcon onClick={handleDelete} id={id} />
    </div>
  );
};

const TodoItemMemoized = memo(
  TodoItem,
  (prev, next) =>
    prev.checked === next.checked && prev.content === next.content,
);

export default TodoItemMemoized;
