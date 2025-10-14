import useTodoStore from "store";
import { TodoEntry } from "types";

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);

  const renderTodo = (todo: TodoEntry) => {
    const { checked, content, id } = todo;

    return (
      <div key={id}>
        <span>{id}</span>
        <span>{content}</span>
        <span>{checked}</span>
      </div>
    );
  };

  return todos.map(renderTodo);
};

export default TodoList;
