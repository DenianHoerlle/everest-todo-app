import { startTransition, useEffect, useState, ViewTransition } from "react";

import { Form, Search, Todo } from "components";
import useTodoStore from "store";

const HomeScreen = () => {
  const todos = useTodoStore(state => state.todos);
  const filteredTodos = useTodoStore(state => state.filteredTodos);

  const [orderedTodos, setOrderedTodos] = useState(todos);

  useEffect(() => {
    startTransition(() => {
      if (filteredTodos) {
        setOrderedTodos(filteredTodos);
        return;
      }

      setOrderedTodos(todos);
    });
  }, [todos, filteredTodos]);

  const renderTodos = () => {
    if (!orderedTodos.length)
      return <span className="mx-auto">No TODOS match your search</span>;

    return orderedTodos.map(todo => {
      return (
        <ViewTransition key={todo.id}>
          <Todo {...todo} />
        </ViewTransition>
      );
    });
  };

  return (
    <div className="mt-20 flex flex-col gap-4 px-4 pb-4">
      <Search />
      <Form />
      <div className="mx-auto flex w-full flex-col items-start gap-4 md:max-w-xl">
        {renderTodos()}
      </div>
    </div>
  );
};

export default HomeScreen;
