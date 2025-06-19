import { createContext } from "react";

export type DragAndDropContextType = [
  string | null,
  (_type: string | null) => void,
];

export const DragAndDropContext = createContext<DragAndDropContextType>([
  null,
  (_type: string | null) => {},
]);
