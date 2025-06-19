import { Position } from "@xyflow/react";

import { BaseNode } from "./BaseNode";
import { Handle } from "./Handle";

export function LayerNode() {
  return (
    <BaseNode title="Layer Node">
      <Handle
        id="a"
        type="target"
        position={Position.Left}
        connectionCount={1}
      />
    </BaseNode>
  );
}
