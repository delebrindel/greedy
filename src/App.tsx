import { useState } from "react";
import { GridGame } from "./components/GridGame";

const EXIT_CELL = {
  x: 3,
  y: 2,
}

function App() {
  const [config, setConfig] = useState({rows: 5, columns: 4})
  return (
    <>
    <GridGame exit={EXIT_CELL} rows={config.rows} columns={config.columns}/>
    </>
  );
}

export default App;
