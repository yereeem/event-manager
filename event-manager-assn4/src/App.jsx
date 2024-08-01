// import css for App component.
import "./App.css";

// import components.
import Title from "./Title.jsx";
import EventList from "./EventList.jsx";
import ParticleBackground from "./ParticleBackground";
import ActionBar from "./ActionBar.jsx";

import { useRef } from "react";

function App() {
  // Create a ref for the scrollable container
  const containerRef = useRef(null);

  // Render the Title and EventList components
  return (
    <>
      <ActionBar />
      {/* ParticleBackground with containerRef passed as prop */}
      <ParticleBackground containerRef={containerRef} />
      {/* The main scrollable container */}
      <div className="scroll-container custom-scrollbar-css" ref={containerRef}>
        <Title />
        <EventList />
      </div>
    </>
  );
}

// Export the App component as the default export
export default App;
