import { ChangeEvent, useState } from "react";

import { CheckMark } from "assets";

const ANIMATION_DURATION_IN_MS = 750;

type CheckBox = {
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const CheckBoxComponent = ({ isChecked, onChange }: CheckBox) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const inputClassNames = isChecked ? "bg-ever-red" : "";

  const wrapperAnimationClassNames = isAnimating
    ? "duration-500 bg-ever-red scale-150 ping"
    : "";

  const checkmarkClassNames = isChecked || isAnimating ? "" : "opacity-0";

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (isAnimating) return;

    setIsAnimating(true);

    setTimeout(() => {
      onChange(event);
      setIsAnimating(false);
    }, ANIMATION_DURATION_IN_MS);
  };

  return (
    <label
      className={`container flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-ever-red hover:shadow-clickable ${wrapperAnimationClassNames} ${inputClassNames}`}
    >
      <input
        className="size-0 appearance-none"
        type="checkbox"
        checked={isChecked}
        onChange={handleOnChange}
      />
      <img
        src={CheckMark}
        className={`w-3 transition ${checkmarkClassNames}`}
      />
    </label>
  );
};

export default CheckBoxComponent;
