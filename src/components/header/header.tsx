import { useScroll } from "hooks";
import everestLogo from "/everest-logo.svg";

const Header = () => {
  const { goingDown: isHeaderMinimized, hasScrolled } = useScroll();

  const maxHeaderClassNames = hasScrolled ? "h-20 animate-header-max" : "";
  const minHeaderClassNames = hasScrolled
    ? "h-10 animate-header-min [&>img]:scale-50"
    : "";

  const wrapperClassNames = `flex bg-background z-10 fixed top-0 transition w-full justify-start items-center px-5 py-3 shadow-header ${isHeaderMinimized ? minHeaderClassNames : maxHeaderClassNames}`;

  const renderText = () => {
    const subTextAnimationClassNames = isHeaderMinimized
      ? "animate-fade-out h-0 opacity-0"
      : "animate-fade-in ";

    const subTextClassNames = hasScrolled ? subTextAnimationClassNames : "";

    return (
      <>
        <h1 className="font-barlow text-lg font-bold whitespace-nowrap">
          Everest Systems' TODO App
        </h1>
        <h2
          className={`font-barlow text-xxs whitespace-nowrap ${subTextClassNames}`}
        >
          By Dênian Hoerlle
        </h2>
      </>
    );
  };

  return (
    <header className={wrapperClassNames}>
      <img className="transition" src={everestLogo} />
      <div className="mx-auto flex max-w-min flex-col text-right">
        {renderText()}
      </div>
    </header>
  );
};

export default Header;
