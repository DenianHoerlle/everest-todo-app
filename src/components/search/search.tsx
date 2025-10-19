import { SearchIcon } from "assets";
import { useEffect, useRef, useState } from "react";
import useTodoStore from "store";
import { checkSubstring } from "utils";

const TYPING_DELAY_IN_MS = 250;

const { setFilteredTodos } = useTodoStore.getState();

const SearchBar = () => {
  const { todos } = useTodoStore();
  const [searchText, setSearchText] = useState("");
  const typingTimer = useRef<number | null>(null);

  useEffect(() => {
    const filterTodos = () => {
      if (!searchText.length) {
        setFilteredTodos(null);
        return;
      }

      const newFilteredTodos = todos.filter(({ content }) =>
        checkSubstring(content, searchText),
      );

      setFilteredTodos(newFilteredTodos);
    };

    if (typingTimer.current) {
      clearInterval(typingTimer.current);
    }

    typingTimer.current = setTimeout(() => {
      filterTodos();
    }, TYPING_DELAY_IN_MS);
  }, [searchText, todos]);

  return (
    <div className="relative mx-auto mt-10 flex h-10 w-full items-center px-5 shadow-input md:w-xl">
      <img src={SearchIcon} className="mr-3 w-5" />
      <input
        className="h-full w-full outline-none placeholder:text-ever-grey"
        value={searchText}
        name="search-input"
        placeholder="Search"
        onChange={e => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
