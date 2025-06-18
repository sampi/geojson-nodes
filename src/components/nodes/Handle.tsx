import {
  Handle as FlowHandle,
  useNodeConnections,
  type HandleProps as FlowHandleProps,
} from "@xyflow/react";

type HandleProps = FlowHandleProps & {
  connectionCount: number;
};

export const Handle = ({ connectionCount, ...props }: HandleProps) => {
  const connections = useNodeConnections({
    handleType: props.type,
  });

  return (
    <FlowHandle
      {...props}
      isConnectable={connections.length < connectionCount}
    />
  );
};
