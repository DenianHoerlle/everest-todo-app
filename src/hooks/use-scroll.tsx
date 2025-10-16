import { useEffect, useMemo, useRef, useState } from "react";

const THROTTLE_TIME_IN_MS = 150;

type Timeout = ReturnType<typeof setTimeout> | null;

const getScrollPosition = () => {
  if (typeof window === "undefined") {
    return 0;
  }

  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
};

const useScroll = () => {
  const defaultScrollTop = useMemo(() => getScrollPosition(), []);
  const previousScrollTop = useRef(defaultScrollTop);
  const [currentScrollTop, setCurrentScrollTop] = useState(defaultScrollTop);
  const goingDown = previousScrollTop.current < currentScrollTop;

  const isRecharging = useRef<boolean>(false);

  useEffect(() => {
    let timeout: Timeout = null;

    const handleDocumentScroll = () => {
      // TODO check why this function gets stuck at 'true' sometimes
      if (isRecharging.current) return;

      isRecharging.current = true;

      timeout = setTimeout(() => {
        const scrollTop = getScrollPosition();

        previousScrollTop.current = currentScrollTop;

        setCurrentScrollTop(scrollTop);

        isRecharging.current = false;
      }, THROTTLE_TIME_IN_MS);
    };

    window.addEventListener("scroll", handleDocumentScroll);

    return () => {
      window.removeEventListener("scroll", handleDocumentScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, [currentScrollTop]);

  return {
    scrollTop: currentScrollTop,
    previousScrollTop: previousScrollTop.current,
    goingDown,
  };
};

export default useScroll;
