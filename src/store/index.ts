import { todoServices } from "services";
import { TodoList } from "types";
import { normalizeTodoList, sortNewlyCheckedTodo } from "utils";
import { create } from "zustand";

interface TodoState {
  todos: TodoList;
  latestId: number;
  addTodo: (content: string) => void;
  getInitialTodos: () => void;
  checkTodo: (id: number) => void;
}

// TODO this hook could use some readability improvements(don't know how yet tho)
const useTodoStore = create<TodoState>()((set, get) => ({
  todos: [],
  latestId: 0,
  addTodo: content =>
    set(state => {
      // Not sure about this get() method. Why not just use 'state.variable'?
      const nextId = get().latestId + 1;

      return {
        todos: [...state.todos, { content, id: nextId, checked: false }],
        latestId: nextId,
      };
    }),
  checkTodo: id =>
    set(state => {
      const newTodos = new Array(...state.todos);

      const checkedTodoIndex = newTodos.findIndex(todo => todo.id === id);

      newTodos[checkedTodoIndex] = {
        ...newTodos[checkedTodoIndex],
        checked: true,
      };

      return { todos: sortNewlyCheckedTodo(newTodos, checkedTodoIndex) };
    }),
  getInitialTodos: async () => {
    const { data } = await todoServices.getTodoList();

    // TODO avaliate if theres a better place to handle API request
    const { todos, latestId } = normalizeTodoList(data.todos);

    set({ todos, latestId });
  },
}));

export default useTodoStore;
