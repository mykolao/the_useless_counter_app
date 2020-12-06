import "./App.css";
import { useState } from "react";

const API_BASE = "https://economic-little-dog.glitch.me/";
const getValue = API_BASE;
const increaseValue = API_BASE + "increase";
const decreaseValue = API_BASE + "decrease";
const mget = { method: "GET" };
const mpost = { method: "POST" };

let errFlag = false;

function App() {
  const [count, setCount] = useState(0);

  const update = (url, method) => {
    if (!errFlag) {
      fetch(url, method)
        .then((res) => res.json())
        .then((data) => {
          setCount(data.value);
        })
        .catch((err) => {
          console.error(err);
          errFlag = true;
        });
    }
  };

  const increaseCounter = () => {
    update(increaseValue, mpost);
  };

  const decreaseCounter = () => {
    update(decreaseValue, mpost);
  };

  const getCounter = () => {
    update(getValue, mget);
  }

  getCounter()

  setInterval(() => {
    getCounter();
  }, 3500);

  return (
    <main className="container">
      <header className="header">
        <h1>The Useless Counter</h1>
      </header>
      <p className="counter">{count}</p>
      <div className="group-btn">
        <button onClick={decreaseCounter} className="btn decrease-btn">
          Decrease
        </button>
        <button onClick={increaseCounter} className="btn increase-btn">
          Increase
        </button>
      </div>
    </main>
  );
}

export default App;
