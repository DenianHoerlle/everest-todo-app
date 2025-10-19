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
    <div className="relative m-auto flex h-10 w-full items-center rounded-4xl border border-ever-blue px-5 md:w-xl">
      <input
        className="h-full w-full outline-none"
        value={searchText}
        placeholder="Search"
        onChange={e => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
