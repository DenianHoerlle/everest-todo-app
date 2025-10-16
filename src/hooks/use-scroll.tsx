import throttle from "lodash.throttle";

import { useEffect, useMemo, useRef, useState } from "react";

const THROTTLE_TIME_IN_MS = 150;

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
    const handleDocumentScroll = throttle(() => {
      isRecharging.current = false;

      const scrollTop = getScrollPosition();

      previousScrollTop.current = currentScrollTop;

      setCurrentScrollTop(scrollTop);
    }, THROTTLE_TIME_IN_MS);

    window.addEventListener("scroll", handleDocumentScroll);

    return () => {
      window.removeEventListener("scroll", handleDocumentScroll);
    };
  }, [currentScrollTop]);

  return {
    scrollTop: currentScrollTop,
    previousScrollTop: previousScrollTop.current,
    goingDown,
  };
};

export default useScroll;
