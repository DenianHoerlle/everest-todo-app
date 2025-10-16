import { useEffect, useMemo, useRef, useState } from "react";
import everestLogo from "/everest-logo.svg";

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

const Header = () => {
  const { goingDown: isHeaderMinimized } = useScroll();

  const maxHeaderClassName = "header-max";
  const minHeaderClassName = "header-min";

  const className = `flex fixed transition w-full justify-start items-center px-5 py-3 border-b ${isHeaderMinimized ? minHeaderClassName : maxHeaderClassName}`;

  const renderText = () => {
    const title = isHeaderMinimized ? "TODO" : "Everest Systems' TODO App";

    return (
      <>
        <h1 className="fade-in text-lg font-bold whitespace-nowrap">{title}</h1>
        {!isHeaderMinimized && (
          <h2 className="fade-in text-xs whitespace-nowrap">
            By Dênian Hoerlle
          </h2>
        )}
      </>
    );
  };

  return (
    <header className={className}>
      <img className="transition" src={everestLogo} />
      <div className="mx-auto flex max-w-min grow flex-col text-right">
        {renderText()}
      </div>
    </header>
  );
};

export default Header;
