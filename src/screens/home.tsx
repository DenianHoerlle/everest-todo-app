import { startTransition, useEffect, useState, ViewTransition } from "react";

import { Form, Header, Todo } from "components";
import useTodoStore from "store";

const HomeScreen = () => {
  const todos = useTodoStore(state => state.todos);

  const [orderedTodos, setOrderedTodos] = useState(todos);

  useEffect(() => {
    startTransition(() => {
      setOrderedTodos(todos);
    });
  }, [todos]);

  return (
    <div className="mt-20">
      <Header />
      <Form />
      <div className="mx-auto flex h-[300vh] max-h-[90vh] w-xl flex-col items-start gap-4">
        {orderedTodos.map(todo => {
          return (
            <ViewTransition key={todo.id}>
              <Todo {...todo} />
            </ViewTransition>
          );
        })}
      </div>
    </div>
  );
};

export default HomeScreen;
