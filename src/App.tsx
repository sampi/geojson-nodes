import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { flowSelector, useStore } from "./store";
import { Flow } from "./components/Flow/Flow";
import { Map } from "./components/Map/Map";

export default function App() {
  const [mapOpen, setMapOpen] = useState(false);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(flowSelector),
  );

  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Flow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onMapOpen={() => setMapOpen(true)}
      />
      <dialog
        open={mapOpen}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100vw",
          height: "100vh",
        }}
      >
        <Map onMapClose={() => setMapOpen(false)} />
      </dialog>
    </main>
  );
}
