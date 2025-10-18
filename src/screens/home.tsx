import { startTransition, useEffect, useState, ViewTransition } from "react";

import { Form, Todo } from "components";
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
    <div className="mt-20 px-4 pb-4">
      <Form />
      <div className="mx-auto flex w-full flex-col items-start gap-4 md:max-w-xl">
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
