import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";
import { useShallow } from "zustand/react/shallow";

import { BaseNode } from "./BaseNode";
import { type SourceNodeType } from "./SourceNode";
import { isSourceNode } from "../../utils/isSourceNode";
import { geojsonSelector, useStore } from "../../store";
import { useEffect, useState } from "react";

export function LayerNode() {
  const [sourceURL, setSourceURL] = useState<string | null>(null);
  const connections = useNodeConnections({
    handleType: "target",
  });
  const nodesData = useNodesData<SourceNodeType>(connections[0]?.source);
  const sourceNode = isSourceNode(nodesData) ? nodesData : null;

  const { getGeoJSON } = useStore(useShallow(geojsonSelector));

  useEffect(() => {
    if (sourceNode?.data?.url) {
      setSourceURL(sourceNode?.data?.url);
    }
  }, [sourceNode?.data?.url]);

  const geoData = sourceURL ? getGeoJSON(sourceURL) : null;

  return (
    <BaseNode title="Layer node">
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      {geoData?.loading && (
        <div style={{ marginTop: "8px", fontSize: "12px" }}>
          Loading GeoJSON...
        </div>
      )}
      {geoData?.error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "red" }}>
          Error: {geoData.error}
        </div>
      )}
      {geoData?.data && !geoData.loading && !geoData.error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "green" }}>
          GeoJSON loaded (
          {(geoData.data as { features?: unknown[] }).features?.length || 0}{" "}
          features)
        </div>
      )}
    </BaseNode>
  );
}
