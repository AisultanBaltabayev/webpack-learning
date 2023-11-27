import { useState } from "react";
import classes from "./App.module.scss";

interface AppProps {}

const App = (props: AppProps) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={increment}>
        <span>+1</span>
      </button>
    </div>
  );
};

export default App;
