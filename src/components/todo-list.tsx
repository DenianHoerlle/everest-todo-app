import useTodoStore from "store";
import { TodoEntry } from "types";

// Isn't gonna change
const { checkTodo } = useTodoStore.getState();

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);

  const handleCheckTodo = (id: number) => {
    checkTodo(id);
  };

  const renderTodo = (todo: TodoEntry) => {
    const { checked, content, id } = todo;

    return (
      <div key={id}>
        <span>{id}</span>
        <span>{content}</span>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => handleCheckTodo(id)}
        />
      </div>
    );
  };

  return todos.map(renderTodo);
};

export default TodoList;
