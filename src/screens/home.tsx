import { startTransition, useEffect, useState, ViewTransition } from "react";

import { Form, Search, Todo } from "components";
import useTodoStore from "store";

const HomeScreen = () => {
  const todos = useTodoStore(state => state.todos);
  const filteredTodos = useTodoStore(state => state.filteredTodos);
  const isLoading = useTodoStore(state => state.isLoading);

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

  const renderHomePageSkeleton = () => {
    return (
      <div className="mx-auto mt-20 flex min-h-[calc(100vh-120px)] w-full flex-col gap-4 px-4 pb-4 md:w-xl [&>div]:w-full">
        <div className="mx-auto flex items-center gap-3 rounded-full bg-input-background px-4 py-3 shadow-input">
          <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
          <div className="flex h-6 flex-1 animate-pulse rounded-2xl bg-gray-300" />
        </div>

        <div>
          <div className="ml-auto h-6 w-6 rounded-full bg-gray-300" />
        </div>

        <div className="mx-auto flex flex-col items-start gap-4">
          {renderTodosSkeleton()}
        </div>
      </div>
    );
  };

  const renderTodosSkeleton = () =>
    Array.from({ length: 3 }).map((_, index) => (
      <div
        key={index}
        className="flex w-full items-center gap-3 rounded-full bg-input-background px-4 py-3 shadow-input"
      >
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
        <div className="flex h-6 flex-1 animate-pulse rounded-2xl bg-gray-300" />
        <div className="h-6 w-6 animate-pulse rounded-full bg-gray-300" />
      </div>
    ));

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

  if (isLoading) return renderHomePageSkeleton();

  return (
    <div className="mt-20 flex min-h-[calc(100vh-120px)] flex-col gap-4 px-4 pb-4">
      <Search />
      <Form />
      <div className="mx-auto flex w-full flex-col items-start gap-4 md:max-w-xl">
        {renderTodos()}
      </div>
    </div>
  );
};

export default HomeScreen;
