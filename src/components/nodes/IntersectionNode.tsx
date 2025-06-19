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

  const sourceData = useNodesData(
    [connections?.[0]?.source, connections?.[1]?.source].filter(Boolean),
  );
  console.log("sourceData", {
    a: sourceData[0]?.data?.geoJSONData?.data,
    b: sourceData[1]?.data?.geoJSONData?.data,
  });
  const a = sourceData[0]?.data?.geoJSONData?.data;
  const b = sourceData[1]?.data?.geoJSONData?.data;

  if (a && b) {
    const intersect = turf.intersect(a, b);
    console.log("intersect", intersect);

    if (intersect) {
      updateNodeData(id, {
        geoJSONData: intersect,
      });
    }
  } else if (a || b) {
    const data = a || b;
    if (geoJSONData !== data) {
      updateNodeData(id, {
        geoJSONData: a || b,
      });
    }
  }

  // let data = null;

  // if (connections.length === 1) {
  //   data =
  //   const connectedNode = connections[0].source;
  //   // get data from sourceNode and use it as the geojson data of this node
  // } else if (connections.length === 2) {
  //   // call turf.intersect on a turf.intersectionCollection that contains data from both a and b
  // }

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
