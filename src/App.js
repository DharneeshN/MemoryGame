import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div className="App">
      <h1 style={{ position: "absolute", top: "0px" }}>Memory Game</h1>
      <Game />
    </div>
  );
}

export default App;
