import { useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { flowSelector, useStore } from "./store";
import { Flow } from "./components/Flow/Flow";
import { Map } from "./components/Map/Map";
import { Dialog } from "./components/Dialog/Dialog";

export default function App() {
  const [mapOpen, setMapOpen] = useState(false);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    useShallow(flowSelector),
  );

  const handleMapClose = () => {
    setMapOpen(false);
  };

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
      <Dialog isOpen={mapOpen} onClose={handleMapClose}>
        <Map onMapClose={handleMapClose} />
      </Dialog>
    </main>
  );
}
