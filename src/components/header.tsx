import { useScroll } from "hooks";
import everestLogo from "/everest-logo.svg";

const Header = () => {
  const { goingDown: isHeaderMinimized } = useScroll();

  const maxHeaderClassName = "header-max";
  const minHeaderClassName = "header-min";

  const className = `flex fixed top-0 transition w-full justify-start items-center px-5 py-3 shadow-header ${isHeaderMinimized ? minHeaderClassName : maxHeaderClassName}`;

  const renderText = () => {
    const subTextClassName = isHeaderMinimized ? "fade-out" : "fade-in";

    return (
      <>
        <h1 className="text-lg font-bold whitespace-nowrap">
          Everest Systems' TODO App
        </h1>
        <h2 className={`text-xxs whitespace-nowrap ${subTextClassName}`}>
          By Dênian Hoerlle
        </h2>
      </>
    );
  };

  return (
    <header className={className}>
      <img className="transition" src={everestLogo} />
      <div className="mx-auto flex max-w-min flex-col text-right">
        {renderText()}
      </div>
    </header>
  );
};

export default Header;
