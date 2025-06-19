import {
  Handle as FlowHandle,
  useNodeConnections,
  type HandleProps as FlowHandleProps,
} from "@xyflow/react";

type HandleProps = FlowHandleProps & {
  connectionCount: number;
};

export const Handle = ({
  connectionCount,
  id,
  ...props
}: Omit<HandleProps, "id"> & { id: string }) => {
  const connections = useNodeConnections({
    handleId: id,
    handleType: props.type,
  });

  return (
    <FlowHandle
      id={id}
      {...props}
      isConnectable={connections.length < connectionCount}
    />
  );
};
