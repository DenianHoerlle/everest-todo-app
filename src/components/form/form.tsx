import { TodoContent } from "types";

import { SubmitHandler, useForm } from "react-hook-form";
import useTodoStore from "store";

import ExpandableButton from "./components/expandable-button";

const Form = () => {
  const addTodo = useTodoStore(state => state.addTodo);

  const formControl = useForm<TodoContent>();

  const onSubmit: SubmitHandler<TodoContent> = data => {
    addTodo(data.content);

    formControl.reset();
  };

  const handleOnSubmit = formControl.handleSubmit(onSubmit);

  return (
    <form
      className="mx-auto flex max-w-xl flex-col py-10"
      onSubmit={handleOnSubmit}
    >
      <ExpandableButton formControl={formControl} onSubmit={handleOnSubmit} />
    </form>
  );
};

export default Form;
