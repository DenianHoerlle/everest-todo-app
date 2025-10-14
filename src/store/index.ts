import { taskServices } from "services";
import { TodoEntry, TodoList } from "types";
import { normalizeTodoList } from "utils";
import { create } from "zustand";

interface TaskState {
  tasks: TodoList;
  latestId: number;
  addTask: (newTask: TodoEntry) => void;
  getInitialTasks: () => void;
}

const useTaskStore = create<TaskState>()(set => ({
  tasks: [],
  latestId: 0,
  addTask: newTask =>
    set(state => ({
      tasks: [...state.tasks, { ...newTask, id: state.latestId + 1 }],
      latestId: state.latestId + 1,
    })),
  getInitialTasks: async () => {
    const { data } = await taskServices.getTaskList();

    // TODO avaliate if theres a better place to handle API request
    const { todos, latestId } = normalizeTodoList(data.todos);

    set({ tasks: todos, latestId });
  },
}));

export default useTaskStore;
