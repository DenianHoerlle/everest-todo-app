import { TodoEntry } from "types";

// TODO move type?
type TodoContent = Omit<TodoEntry, "id" | "checked">;

import { SubmitHandler, useForm } from "react-hook-form";
import useTodoStore from "store";

const Form = () => {
  const addTodo = useTodoStore(state => state.addTodo);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoContent>();

  const onSubmit: SubmitHandler<TodoContent> = data => {
    addTodo(data.content);

    reset();
  };

  return (
    <form
      className="mx-auto py-10 max-w-xl flex flex-col"
      onSubmit={handleSubmit(onSubmit)}>
      <span>What's your next task?</span>
      <input className="border" {...register("content", { required: true })} />

      {errors.content && <span>This field can't be empty</span>}

      <input className="border" type="submit" value="Submit" />
    </form>
  );
};

export default Form;
