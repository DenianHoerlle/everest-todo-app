import { ChangeEvent } from "react";

import { CheckMark } from "assets";

const CheckBoxComponent = ({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const inputClassName = checked ? "bg-ever-red" : "";

  return (
    <label
      className={`container flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-ever-red transition hover:shadow-clickable ${inputClassName}`}>
      <input
        className="size-0 appearance-none"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {checked && <img src={CheckMark} className="w-3" />}
    </label>
  );
};

export default CheckBoxComponent;
