import { Plus } from "assets";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { TodoContent } from "types";

type props = {
  formControl: UseFormReturn<TodoContent>;
};

const ExpandableButton = ({ formControl }: props) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    formState: { errors },
    register,
    clearErrors,
    setFocus,
  } = formControl;

  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
      setFocus("content");
    }
  };

  const handleWrapperBlur = (
    event: React.FocusEvent<HTMLDivElement, Element>,
  ) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const placeholderText = errors.content
    ? "This field can't be empty!"
    : "What's your next task?";

  const placeholderClassNames = errors.content
    ? "placeholder:text-ever-red placeholder:opacity-100"
    : "";

  const wrapperClassNames = errors.content
    ? "border-ever-red outline-ever-red"
    : "";

  const fadeInOnOpen = isOpen
    ? "animate-fade-in-delayed"
    : "animate-fade-out-delayed opacity-0";

  const fadeInOnClose = isOpen
    ? "animate-fade-out-delayed opacity-0"
    : "animate-fade-in-delayed";

  const buttonCassNames = isOpen ? "w-20" : "h-10 w-10";

  const absoluteCenterClassNames =
    "absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)]";

  return (
    <div
      className={`flex w-full justify-end rounded-4xl transition ${isOpen ? "bg-white" : "bg-transparent"} p-2 ${wrapperClassNames}`}
      onBlur={handleWrapperBlur}
    >
      {isOpen && (
        <input
          className={`flex w-full px-5 py-2 outline-0 ${placeholderClassNames}`}
          placeholder={placeholderText}
          autoFocus
          {...register("content", {
            required: true,
            onBlur: () => {
              clearErrors();
            },
          })}
        />
      )}

      <button
        type="button"
        className={`hover-bg relative cursor-pointer rounded-4xl bg-ever-red hover:shadow-clickable ${buttonCassNames}`}
        onClick={handleClick}
      >
        <img
          src={Plus}
          className={`w-3/4 ${fadeInOnClose} ${absoluteCenterClassNames}`}
        />
        <span
          className={`font-bold text-white ${fadeInOnOpen} ${absoluteCenterClassNames}`}
        >
          Submit
        </span>
      </button>
    </div>
  );
};

export default ExpandableButton;
