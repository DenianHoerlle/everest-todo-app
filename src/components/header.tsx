import everestLogo from "/everest-logo.svg";

const Header = () => {
  return (
    <header className="flex justify-start items-center px-5 py-3 border-b">
      <img src={everestLogo} />
      <div className="flex-1 text-center">
        <h1>Everest Systems' TODO App</h1>
        <h2>By Dênian Hoerlle</h2>
      </div>
    </header>
  );
};

export default Header;
