import { useEffect } from "react";
import {
  Position,
  useReactFlow,
  type NodeProps,
  type Node,
  Handle,
} from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";

import { BaseNode } from "./BaseNode";
import { type GeoJSONData } from "../../types";
import { useStore } from "../../store";

export type SourceNodeType = Node<{
  url: string;
  geoJSONData: GeoJSONData | null;
}>;

export function SourceNode({
  id,
  data: { url, geoJSONData },
}: NodeProps<SourceNodeType>) {
  const { updateNodeData } = useReactFlow();
  const { fetchGeoJSON, geoJSONData: storeData } = useStore(
    useShallow((state) => ({
      fetchGeoJSON: state.fetchGeoJSON,
      geoJSONData: state.geoJSONData,
    })),
  );

  useEffect(() => {
    if (url && url.trim()) {
      fetchGeoJSON(url);
    }
  }, [url, fetchGeoJSON]);

  useEffect(() => {
    if (url && storeData[url]) {
      const currentData = storeData[url];
      if (currentData !== geoJSONData) {
        updateNodeData(id, { geoJSONData: currentData });
      }
    }
  }, [url, storeData, geoJSONData, updateNodeData, id]);

  return (
    <BaseNode title="Source node">
      <input
        className="nodrag"
        type="text"
        // @TODO url validation
        onChange={(event) => updateNodeData(id, { url: event.target.value })}
        value={url}
      />
      {geoJSONData?.loading && (
        <div style={{ marginTop: "8px", fontSize: "12px" }}>
          Loading GeoJSON...
        </div>
      )}
      {geoJSONData?.error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "red" }}>
          Error: {geoJSONData.error}
        </div>
      )}
      {geoJSONData?.data && !geoJSONData.loading && !geoJSONData.error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "green" }}>
          GeoJSON loaded (
          {(geoJSONData.data as { features?: unknown[] }).features?.length || 0}{" "}
          features)
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  );
}
