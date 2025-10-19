import { FC, useEffect } from "react";

import { Footer, Header } from "components";
import { HomeScreen } from "screens";
import useTodoStore from "store";

const App: FC = () => {
  const initStore = useTodoStore(state => state.getInitialTodos);

  useEffect(() => {
    initStore();
  }, [initStore]);

  return (
    <>
      <Header />
      <HomeScreen />
      <Footer />
    </>
  );
};

export default App;
