import { FC, useEffect } from "react";

import { HomeScreen } from "screens";
import useTodoStore from "store";

const App: FC = () => {
  const initStore = useTodoStore(state => state.getInitialTodos);

  useEffect(() => {
    initStore();
  }, [initStore]);

  return <HomeScreen />;
};

export default App;
