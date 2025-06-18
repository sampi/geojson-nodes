import { useEffect, useRef, useState } from "react";
import {
  Handle,
  Position,
  useNodeConnections,
  useNodesData,
} from "@xyflow/react";

import { BaseNode } from "./BaseNode";
import { type SourceNodeType } from "./SourceNode";
import { isSourceNode } from "../../utils/isSourceNode";

export function LayerNode() {
  const connections = useNodeConnections({
    handleType: "target",
  });
  const nodesData = useNodesData<SourceNodeType>(connections[0]?.source);
  const sourceNode = isSourceNode(nodesData) ? nodesData : null;

  const [geoJsonData, setGeoJsonData] = useState<object | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previousUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchGeoJsonData = async (url: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch GeoJSON: ${response.status} ${response.statusText}`,
          );
        }

        const data = await response.json();
        setGeoJsonData(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setGeoJsonData(null);
      } finally {
        setIsLoading(false);
      }
    };

    const currentUrl = sourceNode?.data?.url;

    if (!currentUrl) {
      setGeoJsonData(null);
      setError(null);
      previousUrlRef.current = null;
      return;
    }

    if (currentUrl !== previousUrlRef.current) {
      previousUrlRef.current = currentUrl;
      fetchGeoJsonData(currentUrl);
    }
  }, [sourceNode]);

  return (
    <BaseNode title="Layer node">
      <Handle
        type="target"
        position={Position.Left}
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      {isLoading && (
        <div style={{ marginTop: "8px", fontSize: "12px" }}>
          Loading GeoJSON...
        </div>
      )}
      {error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "red" }}>
          Error: {error}
        </div>
      )}
      {geoJsonData && !isLoading && !error && (
        <div style={{ marginTop: "8px", fontSize: "12px", color: "green" }}>
          GeoJSON loaded (
          {(geoJsonData as { features?: unknown[] }).features?.length || 0}{" "}
          features)
        </div>
      )}
    </BaseNode>
  );
}
