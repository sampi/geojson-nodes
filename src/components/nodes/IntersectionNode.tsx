import {
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import * as turf from "@turf/turf";

import type { GeoJSONData } from "../../types";
import { BaseNode } from "./BaseNode";
import { Handle } from "./Handle";
import type { SourceNodeType } from "./SourceNode";
import { useEffect } from "react";

export type IntersectionNodeType = Node<{
  geoJsonData: GeoJSONData | null;
}>;

export function IntersectionNode({
  id,
  data: { geoJsonData },
}: NodeProps<IntersectionNodeType>) {
  const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections({
    handleType: "target",
  });

  const sourceData = useNodesData<SourceNodeType>(
    [connections?.[0]?.source, connections?.[1]?.source].filter(Boolean),
  );
  useEffect(() => {
    const a = sourceData[0]?.data?.geoJsonData?.data;
    const b = sourceData[1]?.data?.geoJsonData?.data;

    if (a && b) {
      try {
        // @TODO Fix this
        const intersect = turf.intersect(
          turf.featureCollection([turf.combine(a), turf.combine(b)]),
        );
        console.log("intersect", intersect);

        if (intersect) {
          updateNodeData(id, {
            geoJsonData: intersect,
          });
        }
      } catch (error) {
        console.error("Intersection failed:", error);
      }
    } else if (a || b) {
      const data = a || b;
      if (geoJsonData !== data) {
        updateNodeData(id, {
          geoJsonData: a || b,
        });
      }
    }
  }, [geoJsonData, id, sourceData, updateNodeData]);

  return (
    <BaseNode title="Intersection Node">
      <Handle
        id="a"
        type="target"
        position={Position.Left}
        connectionCount={1}
        style={{ top: "25%" }}
      />
      <Handle
        id="b"
        type="target"
        position={Position.Left}
        connectionCount={1}
        style={{ top: "75%" }}
      />

      <Handle
        id="out"
        type="source"
        position={Position.Right}
        connectionCount={1}
      />
    </BaseNode>
  );
}
