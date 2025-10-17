import { Form, Header, Todo } from "components";
import useTodoStore from "store";

const HomeScreen = () => {
  const todos = useTodoStore(state => state.todos);

  return (
    <div className="mt-20">
      <Header />
      <Form />
      <div className="mx-auto flex h-[300vh] max-h-[90vh] w-xl flex-col items-start gap-4">
        {todos.map(todo => (
          <Todo key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
