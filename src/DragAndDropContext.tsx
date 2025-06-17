import { createContext, useContext, useState } from "react";

const DragAndDropContext = createContext([null, (_) => {}]);

export const DragAndDropProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [type, setType] = useState(null);

  return (
    <DragAndDropContext.Provider value={[type, setType]}>
      {children}
    </DragAndDropContext.Provider>
  );
};

export default DragAndDropContext;

export const useDragAndDrop = () => {
  return useContext(DragAndDropContext);
};
