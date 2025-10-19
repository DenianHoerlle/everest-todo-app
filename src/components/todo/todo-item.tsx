import { memo, useCallback, useState } from "react";

import useTodoStore from "store";
import { TodoContent, TodoEntry } from "types";

import { useForm } from "react-hook-form";
import { CheckBoxComponent, DeleteIcon } from "./components";

// Isn't gonna change
const { checkTodo, deleteTodo, editTodo } = useTodoStore.getState();

const TodoItem = ({ checked, content, id }: TodoEntry) => {
  const [isEditable, setIsEditable] = useState(false);

  const { handleSubmit, register, reset } = useForm<TodoContent>({
    defaultValues: {
      content,
    },
  });

  const handleEdit = (data: TodoContent) => {
    if (!data.content) return;

    editTodo(id, data.content);
    setIsEditable(false);
  };

  const handleOnChange = useCallback(() => {
    checkTodo(id);
  }, [id]);

  const handleDelete = useCallback(() => {
    deleteTodo(id);
  }, [id]);

  const handleOnBlur = () => {
    setIsEditable(false);
    reset();
  };

  const checkedClassName = checked ? "opacity-70" : "";
  const checkedTextClassNames = checked ? "line-through" : "";

  return (
    <div
      key={id}
      className={`flex w-full items-center gap-3 rounded-full bg-input-background px-4 py-3 shadow-input ${checkedClassName}`}
    >
      <CheckBoxComponent isChecked={checked} onChange={handleOnChange} />
      {isEditable ? (
        <form onSubmit={handleSubmit(handleEdit)} className="flex flex-1">
          <input
            {...register("content")}
            name="content"
            autoFocus
            readOnly={!isEditable}
            onBlur={handleOnBlur}
            className={`flex w-full outline-0 ${checkedTextClassNames}`}
          />
        </form>
      ) : (
        <span
          onDoubleClick={() => setIsEditable(true)}
          className={`flex flex-1 cursor-pointer text-sm ${checkedTextClassNames}`}
        >
          {content}
        </span>
      )}
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
