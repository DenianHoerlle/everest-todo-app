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
    set(state => ({
      todos: [
        ...state.todos,
        { content, id: state.latestId + 1, checked: false },
      ],
      latestId: get().latestId + 1,
    })),
  getInitialTodos: async () => {
    const { data } = await todoServices.getTodoList();

    // TODO avaliate if theres a better place to handle API request
    const { todos, latestId } = normalizeTodoList(data.todos);

    set({ todos, latestId });
  },
}));

export default useTodoStore;
