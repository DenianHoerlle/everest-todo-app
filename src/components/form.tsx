// import { TodoEntry } from "types";

// // TODO move type?
// type TodoContent = Omit<TodoEntry, "id" | "checked">;

// import { SubmitHandler, useForm } from "react-hook-form";
// import useTodoStore from "store";

// const Form = () => {
//   const addTodo = useTodoStore(state => state.addTodo);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<TodoContent>();

//   const onSubmit: SubmitHandler<TodoContent> = data => {
//     addTodo(data.content);

//     reset();
//   };

//   const renderInput = () => {
//     const placeholderText = errors.content
//       ? "This field can't be empty!"
//       : "What's your next task?";

//     const placeholderClassNames = errors.content
//       ? "placeholder:text-ever-red placeholder:opacity-100"
//       : "";

//     const wrapperClassNames = errors.content
//       ? "border-ever-red outline-ever-red"
//       : "";

//     return (
//       <div
//         className={`flex w-full justify-end rounded-4xl border ${wrapperClassNames}`}>
//         <input
//           className={`flex w-full p-2 outline-0 ${placeholderClassNames}`}
//           placeholder={placeholderText}
//           {...register("content", { required: true })}
//         />

//         <input
//           className="z-10 -my-0.5 -mr-0.5 cursor-pointer rounded-4xl border p-2"
//           type="submit"
//           value="Submit"
//         />
//       </div>
//     );
//   };

//   return (
//     <form
//       className="mx-auto flex max-w-xl flex-col py-10"
//       onSubmit={handleSubmit(onSubmit)}>
//       {renderInput()}
//     </form>
//   );
// };

// export default Form;

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
    clearErrors,
  } = useForm<TodoContent>();

  const onSubmit: SubmitHandler<TodoContent> = data => {
    addTodo(data.content);

    reset();
  };

  const renderInput = () => {
    const placeholderText = errors.content
      ? "This field can't be empty!"
      : "What's your next task?";

    const placeholderClassNames = errors.content
      ? "placeholder:text-ever-red placeholder:opacity-100"
      : "";

    const wrapperClassNames = errors.content
      ? "border-ever-red outline-ever-red"
      : "";

    return (
      <div
        className={`flex w-full justify-end rounded-4xl border ${wrapperClassNames}`}>
        <input
          className={`flex w-full p-2 outline-0 ${placeholderClassNames}`}
          placeholder={placeholderText}
          {...register("content", {
            required: true,
            onBlur: () => clearErrors(),
          })}
        />

        <input
          className="z-10 -my-0.5 -mr-0.5 cursor-pointer rounded-4xl border p-2"
          type="submit"
          value="Submit"
        />
      </div>
    );
  };

  return (
    <form
      className="mx-auto flex max-w-xl flex-col py-10"
      onSubmit={handleSubmit(onSubmit)}>
      {renderInput()}
    </form>
  );
};

export default Form;
