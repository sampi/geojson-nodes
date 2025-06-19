import { useContext } from "react";
import {
  DragAndDropContext,
  type DragAndDropContextType,
} from "./DragAndDropContext";

export const useDragAndDrop = (): DragAndDropContextType => {
  return useContext(DragAndDropContext);
};
