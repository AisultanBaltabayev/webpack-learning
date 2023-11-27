import { useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import avatarPng from "@/assets/avatar.png";
import avatarJpg from "@/assets/avatar.jpg";
import Calendar from "@/assets/calendar.svg";

interface AppProps {}

const App = (props: AppProps) => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <div>
        <img width={100} height={100} src={avatarPng} alt="Avatar-png" />
        <img width={100} height={100} src={avatarJpg} alt="Avatar-jpg" />
      </div>

      <div>
        <Calendar width={100} height={100} />
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <Link to={"/about"}>about</Link>
        <Link to={"/store"}>store</Link>
      </div>

      <h1 className={classes.value}>{count}</h1>
      <button className={classes.button} onClick={increment}>
        <span>+1</span>
      </button>
      <Outlet />
    </div>
  );
};

export default App;
