import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";
import type { GeoJSON } from "geojson";

export type GeoJSONData = {
  loading: boolean;
  data: GeoJSON | null; // GeoJSON data
  error: string | null;
};

export type AppState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (_nodes: Node[]) => void;
  setEdges: (_edges: Edge[]) => void;
  geoJSONData: Record<string, GeoJSONData>;
  fetchGeoJSON: (_url: string) => Promise<void>;
  getGeoJSON: (_url: string) => GeoJSONData;
};
