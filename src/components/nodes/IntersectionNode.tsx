import {
  Position,
  useNodeConnections,
  useNodesData,
  useReactFlow,
  type Node,
  type NodeProps,
} from "@xyflow/react";
import * as turf from "@turf/turf";

import { BaseNode } from "./BaseNode";
import { Handle } from "./Handle";
import type { GeoJSONData } from "../../types";

export type IntersectionNodeType = Node<{
  geoJSONData: GeoJSONData | null;
}>;

export function IntersectionNode({
  id,
  data: { geoJSONData },
}: NodeProps<IntersectionNodeType>) {
  const { updateNodeData } = useReactFlow();
  const connections = useNodeConnections({
    handleType: "target",
  });
  console.log("connections", connections);

  const sourceData = useNodesData<SourceNodeType>(
    [connections?.[0]?.source, connections?.[1]?.source].filter(Boolean),
  );
  const a = sourceData[0]?.data?.geoJSONData?.data;
  const b = sourceData[1]?.data?.geoJSONData?.data;

  if (a && b) {
    try {
      // @TODO Fix this, but it's almost 4 am...
      const intersect = turf.intersect(
        turf.featureCollection([turf.combine(a), turf.combine(b)]),
      );
      console.log("intersect", intersect);

      if (intersect) {
        updateNodeData(id, {
          geoJSONData: intersect,
        });
      }
    } catch (error) {
      console.error("Intersection failed:", error);
    }
  } else if (a || b) {
    const data = a || b;
    if (geoJSONData !== data) {
      updateNodeData(id, {
        geoJSONData: a || b,
      });
    }
  }

  return (
    <BaseNode title="Intersection node">
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
