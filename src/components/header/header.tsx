import { useScroll } from "hooks";
import everestLogo from "/everest-logo.svg";

const Header = () => {
  const { goingDown: isHeaderMinimized, hasScrolled } = useScroll();

  const maxHeaderClassNames = hasScrolled ? "h-20 animate-header-max" : "";
  const minHeaderClassNames = hasScrolled
    ? "h-10 animate-header-min [&>img]:scale-50"
    : "";

  const wrapperClassNames = `flex bg-white z-10 fixed top-0 transition w-full justify-start items-center px-5 py-3 shadow-header ${isHeaderMinimized ? minHeaderClassNames : maxHeaderClassNames}`;

  const renderText = () => (
    <h1 className="font-barlow text-2xl font-bold whitespace-nowrap">
      Everest Systems' TODO App
    </h1>
  );

  return (
    <header className={wrapperClassNames}>
      <img src={everestLogo} alt="everest-logo" className="transition" />
      <div className="mx-auto flex w-full flex-col text-left md:max-w-xl">
        {renderText()}
      </div>
    </header>
  );
};

export default Header;
