import { createContext, useContext, useState } from "react";

type DragAndDropContextType = [string | null, (_type: string | null) => void];

const DragAndDropContext = createContext<DragAndDropContextType>([
  null,
  (_type: string | null) => {},
]);

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

// eslint-disable-next-line react-refresh/only-export-components
export const useDragAndDrop = (): DragAndDropContextType => {
  return useContext(DragAndDropContext);
};
