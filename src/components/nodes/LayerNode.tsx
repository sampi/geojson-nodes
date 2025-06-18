import { Handle, Position } from "@xyflow/react";

import { BaseNode } from "./BaseNode";

export function LayerNode() {
  return (
    <BaseNode title="Layer node">
      <Handle type="target" position={Position.Left} />
    </BaseNode>
  );
}
