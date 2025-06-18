import { useEffect } from "react";
import {
  Handle,
  Position,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";

import { BaseNode } from "./BaseNode";
import { type GeoJSONData } from "../../types";
import { useStore } from "../../store";

export type SourceNodeType = Node<{
  url: string;
  geojsonData: GeoJSONData | null;
}>;

export function SourceNode({ id, data: { url, geojsonData } }: NodeProps<SourceNodeType>) {
  const { updateNodeData } = useReactFlow();
  const { fetchGeoJSON, geojsonData: storeData } = useStore(
    useShallow((state) => ({
      fetchGeoJSON: state.fetchGeoJSON,
      geojsonData: state.geojsonData,
    }))
  );

  useEffect(() => {
    if (url && url.trim()) {
      fetchGeoJSON(url);
    }
  }, [url, fetchGeoJSON]);

  useEffect(() => {
    if (url && storeData[url]) {
      const currentData = storeData[url];
      if (currentData !== geojsonData) {
        updateNodeData(id, { geojsonData: currentData });
      }
    }
  }, [url, storeData, geojsonData, updateNodeData, id]);

  return (
    <BaseNode title="Source node">
      <input
        className="nodrag"
        type="text"
        // @TODO url validation
        onChange={(event) => updateNodeData(id, { url: event.target.value })}
        value={url}
      />
      {geojsonData?.loading && (
        <div style={{ marginTop: "8px", fontSize: "12px" }}>
          Loading GeoJSON...
        </div>
      )}
      {geojsonData?.error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "red" }}>
          Error: {geojsonData.error}
        </div>
      )}
      {geojsonData?.data && !geojsonData.loading && !geojsonData.error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "green" }}>
          GeoJSON loaded (
          {(geojsonData.data as { features?: unknown[] }).features?.length || 0}{" "}
          features)
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        onConnect={(params) => console.log("source handle onConnect", params)}
      />
    </BaseNode>
  );
}
