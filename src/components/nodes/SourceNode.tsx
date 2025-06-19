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
  geoJsonData: GeoJSONData | null;
}>;

export function SourceNode({
  id,
  data: { url, geoJsonData },
}: NodeProps<SourceNodeType>) {
  const { updateNodeData } = useReactFlow();
  const { fetchGeoJSON, storeGeoJSONData } = useStore(
    useShallow((state) => ({
      fetchGeoJSON: state.fetchGeoJSON,
      storeGeoJSONData: url ? state.geoJsonData[url] : undefined,
    })),
  );

  useEffect(() => {
    if (url && url.trim()) {
      if (!storeGeoJSONData) {
        fetchGeoJSON(url);
      }

      if (storeGeoJSONData !== geoJsonData) {
        updateNodeData(id, { geoJsonData: storeGeoJSONData || null });
      }
    }
  }, [url, fetchGeoJSON, geoJsonData, updateNodeData, id, storeGeoJSONData]);

  return (
    <BaseNode title="Source Node">
      <input
        className="nodrag"
        type="text"
        // @TODO url validation
        onChange={(event) => updateNodeData(id, { url: event.target.value })}
        value={url}
      />
      {geoJsonData?.loading && (
        <div style={{ marginTop: "8px", fontSize: "12px" }}>
          Loading GeoJSON...
        </div>
      )}
      {geoJsonData?.error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "red" }}>
          Error: {geoJsonData.error}
        </div>
      )}
      {geoJsonData?.data && !geoJsonData.loading && !geoJsonData.error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "green" }}>
          GeoJSON loaded (
          {(geoJsonData.data as { features?: unknown[] }).features?.length || 0}{" "}
          features)
        </div>
      )}
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  );
}
