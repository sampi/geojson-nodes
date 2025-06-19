import { useState } from "react";
import { DragAndDropContext } from "./DragAndDropContext";

export const DragAndDropProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [type, setType] = useState<string | null>(null);

  return (
    <DragAndDropContext.Provider value={[type, setType]}>
      {children}
    </DragAndDropContext.Provider>
  );
};
