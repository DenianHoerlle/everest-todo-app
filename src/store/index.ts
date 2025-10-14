import { todoServices } from "services";
import { TodoList } from "types";
import { normalizeTodoList } from "utils";
import { create } from "zustand";

interface TodoState {
  todos: TodoList;
  latestId: number;
  addTodo: (content: string) => void;
  getInitialTodos: () => void;
}

// TODO this hook could use some readability improvements(don't know how yet tho)
const useTodoStore = create<TodoState>()((set, get) => ({
  todos: [],
  latestId: 0,
  addTodo: content =>
    set(state => {
      const nextId = get().latestId + 1;

      return {
        todos: [...state.todos, { content, id: nextId, checked: false }],
        latestId: nextId,
      };
    }),
  getInitialTodos: async () => {
    const { data } = await todoServices.getTodoList();

    // TODO avaliate if theres a better place to handle API request
    const { todos, latestId } = normalizeTodoList(data.todos);

    set({ todos, latestId });
  },
}));

export default useTodoStore;
