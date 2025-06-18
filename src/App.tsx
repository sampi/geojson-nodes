import { NodesDrawer } from "./components/NodesDrawer/NodesDrawer";
import { Flow } from "./components/Flow/Flow";

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <NodesDrawer />
      <main style={{ flexGrow: 1, width: "100vw", height: "100vh" }}>
        <Flow />
      </main>
    </div>
  );
}
