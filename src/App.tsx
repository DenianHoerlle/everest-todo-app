import { FC, useEffect } from "react";

import { HomeScreen } from "screens";
import useTaskStore from "store";

const App: FC = () => {
  const initStore = useTaskStore(state => state.getInitialTasks);

  useEffect(() => {
    initStore();
  }, [initStore]);

  return <HomeScreen />;
};

export default App;
