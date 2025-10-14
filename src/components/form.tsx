import { useState } from "react";
import { TodoEntry, TodoList } from "types";

import { SubmitHandler, useForm } from "react-hook-form";

// TODO create incremental id generator based on API return
const generateRandomId = (): number => Math.round(Math.random() * 100);

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TodoEntry>();

  // TODO use global store instead of local;
  const [tasks, setTasks] = useState<TodoList>([]);

  const onSubmit: SubmitHandler<TodoEntry> = data => {
    reset();

    // TODO update global store instead of local;
    setTasks([
      ...tasks,
      {
        id: generateRandomId(),
        content: data.content,
        checked: false,
      },
    ]);
  };

  return (
    <form
      className="mx-auto py-10 max-w-xl flex flex-col"
      onSubmit={handleSubmit(onSubmit)}>
      <span>What's your next task?</span>
      <input className="border" {...register("content", { required: true })} />

      {errors.content && <span>This field can't be empty</span>}

      <input className="border" type="submit" value="Send" />
    </form>
  );
};

export default Form;
