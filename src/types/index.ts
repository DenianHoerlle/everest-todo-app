// TODO add 'Types' sufix to all types(?)
export type TodoEntry = { id: number; content: string; checked: boolean };
export type TodoList = TodoEntry[];
export type ApiRequest = { todos: TodoList };

export type TodoContent = Omit<TodoEntry, "id" | "checked">;
