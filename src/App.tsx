import React from "react";
import Portfolio from "./components/Portfolio";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen gradient-bg">
      <Portfolio onNavigateToPricing={() => {}} />
    </div>
  );
}

export default App;
