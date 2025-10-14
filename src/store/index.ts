import { TodoEntry, TodoList } from "types";
import { create } from "zustand";

interface TaskState {
  tasks: TodoList;
  latestId: number;
  addTask: (newTask: TodoEntry) => void;
}

const useTaskStore = create<TaskState>()(set => ({
  tasks: [],
  latestId: 0,
  addTask: newTask =>
    set(state => ({
      tasks: [...state.tasks, { ...newTask, id: state.latestId + 1 }],
      latestId: state.latestId + 1,
    })),
}));

export default useTaskStore;
