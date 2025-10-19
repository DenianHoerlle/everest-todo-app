import { todoServices } from "services";
import { TodoList } from "types";
import { normalizeTodoList } from "utils";
import { create } from "zustand";

interface TodoState {
  todos: TodoList;
  filteredTodos: TodoList | null;
  isLoading: boolean;
  latestId: number;
  getInitialTodos: () => void;
  addTodo: (content: string) => void;
  checkTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newContent: string) => void;
  setFilteredTodos: (filteredTodos: TodoList | null) => void;
}

// TODO this hook could use some readability improvements(don't know how yet tho)
const useTodoStore = create<TodoState>()((set, get) => ({
  todos: [],
  filteredTodos: null,
  isLoading: true,
  latestId: 0,
  addTodo: content =>
    set(state => {
      // Not sure about this get() method. Why not just use 'state.variable'?
      const nextId = get().latestId + 1;

      return {
        todos: [{ content, id: nextId, checked: false }, ...state.todos],
        latestId: nextId,
      };
    }),
  checkTodo: id =>
    set(state => {
      const newTodos = new Array(...state.todos);

      const checkedTodoIndex = newTodos.findIndex(todo => todo.id === id);

      newTodos[checkedTodoIndex] = {
        ...newTodos[checkedTodoIndex],
        checked: !newTodos[checkedTodoIndex].checked,
      };

      // TODO check if 'normalizeTodoList' is necessary
      const { todos } = normalizeTodoList(newTodos);

      return { todos };
    }),
  deleteTodo: id =>
    set(state => {
      const newTodos = new Array(...state.todos);

      const removedTodoIndex = newTodos.findIndex(todo => todo.id === id);

      newTodos.splice(removedTodoIndex, 1);

      return { todos: newTodos };
    }),
  editTodo: (id, newContent) =>
    set(state => {
      const newTodos = new Array(...state.todos);

      const editedTodoIndex = newTodos.findIndex(todo => todo.id === id);

      newTodos[editedTodoIndex] = {
        ...newTodos[editedTodoIndex],
        content: newContent,
      };

      return { todos: newTodos };
    }),
  setFilteredTodos: filteredTodos => set(() => ({ filteredTodos })),
  getInitialTodos: async () => {
    const { data } = await todoServices.getTodoList();

    // TODO avaliate if theres a better place to handle API request
    const { todos, latestId } = normalizeTodoList(data.todos);

    set({ todos, latestId, isLoading: false });
  },
}));

export default useTodoStore;
