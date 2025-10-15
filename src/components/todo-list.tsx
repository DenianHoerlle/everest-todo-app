import useTodoStore from "store";
import TodoComponent from "./todo-item";

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);

  return todos.map(todo => <TodoComponent key={todo.id} {...todo} />);
};

export default TodoList;
