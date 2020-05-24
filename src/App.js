import "./App.scss";

import React from "react";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <header>
        <ul>
          <li className="active">Stats</li>
          <li>Projects</li>
          <li>Reports</li>
        </ul>
      </header>
      <section>
      </section>
    </div>
  );
}

export default App;
