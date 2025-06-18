import type { SourceNodeType } from "../components/nodes/SourceNode";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isSourceNode(node: any): node is SourceNodeType {
  return !node ? false : node.type === "sourceNode";
}
