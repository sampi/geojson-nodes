import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
} from "@xyflow/react";

export type AppNode = Node;

export type GeoJSONData = {
  loading: boolean;
  data: Record<string, unknown> | null; // GeoJSON data
  error: string | null;
};

export type AppState = {
  nodes: AppNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (_nodes: AppNode[]) => void;
  setEdges: (_edges: Edge[]) => void;
  geojsonData: Record<string, GeoJSONData>;
  fetchGeoJSON: (_url: string) => Promise<void>;
  getGeoJSON: (_url: string) => GeoJSONData;
};
