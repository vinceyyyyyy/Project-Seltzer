import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Counter from "./components/counter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="text-center">
      <header className="m-4">
        <p>Hello Vite + React!</p>
        <p>
          <button
            className="border border-orange-400 rounded px-4 py-2 mt-4 hover:(bg-teal-400 border-orange-400)"
            onClick={() => setCount((count) => count + 1)}
          >
            count is: {count}
          </button>
        </p>
      </header>
      <Counter />
    </div>
  );
}

export default App;
