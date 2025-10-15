import { memo } from "react";

import useTodoStore from "store";
import { TodoEntry } from "types";

// Isn't gonna change
const { checkTodo, deleteTodo } = useTodoStore.getState();

const TodoComponent = memo(
  ({ checked, content, id }: TodoEntry) => {
    return (
      <div key={id} className="flex gap-3">
        <span>{id}</span>
        <span>{content}</span>
        <button onClick={() => deleteTodo(id)}>delete</button>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => checkTodo(id)}
        />
      </div>
    );
  },
  (prev, next) => prev.checked === next.checked,
);

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);

  return todos.map(todo => <TodoComponent key={todo.id} {...todo} />);
};

export default TodoList;
