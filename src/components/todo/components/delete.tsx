import { useEffect, useRef, useState } from "react";

type AnimateValues = {
  values: string;
  offset: number;
};

// TODO try (again) to source colors from tailwind (index.css) file
const everRed = "#f96673";
const everGrey = "#9fbdcd";

const animateValues: AnimateValues[] = [
  { values: `${everGrey}; ${everRed}; ${everRed}; ${everRed};`, offset: 0 },
  { values: `${everGrey}; ${everGrey}; ${everRed}; ${everRed};`, offset: 0.5 },
  { values: `${everGrey}; ${everGrey}; ${everGrey}; ${everRed};`, offset: 1 },
];

const ThrashIconSVG = (isAnimating: boolean, id: number) => {
  const animationRef = useRef<SVGAnimationElement[]>([]);

  useEffect(() => {
    if (isAnimating)
      for (const animate of animationRef.current) {
        animate?.beginElement?.();
      }
  }, [isAnimating]);

  const addRef = (ref: SVGAnimationElement) => {
    if (ref) animationRef.current.push(ref);
  };

  const renderAnimatedGradient = (data: AnimateValues) => {
    return (
      <stop offset={data.offset} stopColor={everRed} key={data.offset}>
        <animate
          attributeName="stop-color"
          begin="indefinite"
          ref={addRef}
          values={data.values}
          dur="1s"
          repeatCount="indefinite"
        />
      </stop>
    );
  };

  const renderAnimatedWiggle = () => (
    <animateTransform
      attributeName="transform"
      attributeType="XML"
      type="rotate"
      values="0 0 0; 5 0 0 ; 0 0 0 ; -5 0 0 ; 0 0 0 ;"
      dur="0.2s"
      repeatCount="indefinite"
    />
  );

  return (
    <svg
      data-name="animated-thrash"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40.03 46.06"
      width="16px"
    >
      <defs>
        <linearGradient
          id={`appear-gradient-${id}`}
          x1="0.5"
          x2="0.5"
          y1="1"
          y2="0"
        >
          {animateValues.map(renderAnimatedGradient)}
        </linearGradient>
      </defs>
      <path
        fill={isAnimating ? `url(#appear-gradient-${id})` : everGrey}
        d="M14.46.22c-1.71.31-1.82 2.63-2.45 2.85-3.41.29-7.21-.29-10.58.02C.69 3.16.21 3.28.08 4.12c-.09.61-.11 3.06 0 3.64.09.49.6.82 1.04.97l38.03-.1c.26-.17.65-.41.74-.72.21-.72.33-4.45-.68-4.73L27.98 3.07C27.3 2.84 27.29.46 25.37.19c-1.72-.24-9.28-.27-10.91.03ZM3.08 11.52c-.54.36-.11.89-.09 1.37.31 10.02 1.24 20.07 1.95 30.04.48 1.6 1.99 2.74 3.62 2.96 7.31-.44 15.27.56 22.5 0 1.99-.16 3.57-1.3 4.06-3.26.61-9.89 1.57-19.83 1.88-29.75.01-.25.41-1.37-.09-1.37H3.09Z"
      />
      {isAnimating && renderAnimatedWiggle()}
    </svg>
  );
};

const DeleteIcon = ({ onClick, id }: { onClick: () => void; id: number }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const timer = useRef<number | null>(null);

  const handleCancelDelete = () => {
    if (timer.current) {
      clearInterval(timer.current);
      setIsAnimating(false);
    }
  };

  const handleOnMouseDown = () => {
    setIsAnimating(true);
    timer.current = setTimeout(() => {
      onClick();
    }, 1000);
  };

  const buttonAnimation = isAnimating ? "scale-150" : "";

  return (
    <button
      onMouseDown={handleOnMouseDown}
      onMouseLeave={handleCancelDelete}
      onMouseUp={handleCancelDelete}
      className={`container ml-auto flex h-6 w-6 cursor-pointer items-center justify-center transition ${buttonAnimation}`}
      key={id}
    >
      {ThrashIconSVG(isAnimating, id)}
    </button>
  );
};

export default DeleteIcon;
