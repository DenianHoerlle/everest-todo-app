import { TodoEntry, TodoList } from "types";

// TODO check if theres a better way of doing this(looks ugly)
function isValidTodo(todo: TodoEntry): todo is TodoEntry {
  const { id, content, checked } = todo as TodoEntry;

  if (typeof id !== "number") return false;
  if (typeof content !== "string") return false;
  if (typeof checked !== "boolean") return false;

  return true;
}

// TODO move type?
type NormalizedTodosWithMaxId = {
  latestId: number;
  todos: TodoList;
};

export const sortNewlyCheckedTodo = (
  todos: TodoList,
  newlyCheckedTodoIndex: number,
): TodoList => {
  if (todos[newlyCheckedTodoIndex + 1].checked) return todos;

  const newlyCheckedTodo = todos[newlyCheckedTodoIndex];

  let firstCheckedTodoIndex = 0;

  for (let i = newlyCheckedTodoIndex + 1; i < todos.length; i++) {
    if (todos[i].checked) {
      firstCheckedTodoIndex = i;
      break;
    }
  }

  // Add 'newlyCheckedTodo' in correct place
  todos.splice(firstCheckedTodoIndex, 0, newlyCheckedTodo);

  // Remove 'newlyCheckedTodo' out of position duplicate
  todos.splice(newlyCheckedTodoIndex, 1);

  return todos;
};

const sortByBoolean = (prev: boolean, next: boolean): number => {
  return (prev ? 1 : 0) - (next ? 1 : 0);
};

export const normalizeTodoList = (
  todos: TodoList,
): NormalizedTodosWithMaxId => {
  // Not sure if the API will always send a sorted list.
  // If thats the case, 'max' could be replaced with 'todos.slice(-1)[0].id'
  // and 'filteredSortedTodos' could be simplified into 'todos.filter(isValidTodo)'
  let max: number = -1;

  const filteredSortedTodos = todos
    .filter(todo => {
      if (!isValidTodo(todo)) return false;

      if (todo.id > max) max = todo.id;

      return true;
    })
    .sort((prev, next) => sortByBoolean(prev.checked, next.checked));

  return { latestId: max, todos: filteredSortedTodos };
};
