import { Plus } from "assets";
import { useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { TodoContent } from "types";

type ExpandableButton = {
  formControl: UseFormReturn<TodoContent>;
  onSubmit: () => void;
};

const ExpandableButton = ({ formControl, onSubmit }: ExpandableButton) => {
  const [isOpen, setIsOpen] = useState(false);
  const canAnimate = useRef(false);
  const {
    formState: { errors },
    register,
    clearErrors,
    setFocus,
  } = formControl;

  const handleClick = () => {
    canAnimate.current = true;
    if (isOpen) return onSubmit();

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
      clearErrors();
    }
  };

  const wrapperClassNames = errors.content
    ? "border-ever-red outline-ever-red"
    : "";

  const buttonCassNames = isOpen ? "w-24" : "h-10 w-10";

  const absoluteCenterClassNames =
    "absolute top-1/2 left-1/2 transform-[translate(-50%,-50%)]";

  const renderInput = () => {
    if (!isOpen) return null;

    const placeholderClassNames = errors.content
      ? "placeholder:text-ever-red placeholder:opacity-100"
      : "";

    const placeholderText = errors.content
      ? "This field can't be empty!"
      : "What's your next task?";

    return (
      <input
        className={`flex w-full px-5 py-2 outline-0 ${placeholderClassNames}`}
        placeholder={placeholderText}
        autoFocus
        {...register("content", {
          required: true,
        })}
      />
    );
  };

  const renderPlusIcon = () => {
    const fadeInOnClose = isOpen
      ? "animate-fade-out-delayed opacity-0"
      : `${canAnimate.current && "animate-fade-in-delayed"}`;

    return (
      <img
        src={Plus}
        className={`w-3/4 ${fadeInOnClose} ${absoluteCenterClassNames}`}
      />
    );
  };

  const renderSubmitButton = () => {
    const fadeInOnOpen = isOpen
      ? "animate-fade-in-delayed"
      : `${canAnimate.current && "animate-fade-out-delayed"} opacity-0`;

    return (
      <span
        className={`font-bold text-white ${fadeInOnOpen} ${absoluteCenterClassNames}`}
      >
        Submit
      </span>
    );
  };

  return (
    <div
      className={`flex w-full justify-end rounded-4xl transition ${isOpen ? "bg-white" : "bg-transparent"} p-2 ${wrapperClassNames}`}
      onBlur={handleWrapperBlur}
    >
      {renderInput()}

      <button
        type="button"
        className={`hover-bg relative cursor-pointer rounded-4xl bg-ever-red hover:shadow-clickable ${buttonCassNames}`}
        onClick={handleClick}
      >
        {renderPlusIcon()}
        {renderSubmitButton()}
      </button>
    </div>
  );
};

export default ExpandableButton;
