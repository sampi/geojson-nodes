import {
  Handle,
  Position,
  useReactFlow,
  type NodeProps,
  type Node,
} from "@xyflow/react";

import { BaseNode } from "./BaseNode";

export type SourceNodeType = Node<{
  url: string;
}>;

export function SourceNode({ id, data: { url } }: NodeProps<SourceNodeType>) {
  const { updateNodeData } = useReactFlow();

  return (
    <BaseNode title="Source node">
      <input
        className="nodrag"
        type="text"
        // @TODO url validation
        onChange={(event) => updateNodeData(id, { url: event.target.value })}
        // default should be : "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_110m_coastline.geojson"
        value={url}
      />
      <Handle type="source" position={Position.Right} />
    </BaseNode>
  );
}
