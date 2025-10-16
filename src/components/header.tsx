import { useScroll } from "hooks";
import everestLogo from "/everest-logo.svg";

const Header = () => {
  const { goingDown: isHeaderMinimized } = useScroll();

  const maxHeaderClassName = "header-max";
  const minHeaderClassName = "header-min";

  const className = `flex fixed top-0 transition w-full justify-start items-center px-5 py-3 border-b ${isHeaderMinimized ? minHeaderClassName : maxHeaderClassName}`;

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
