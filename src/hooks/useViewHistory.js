import { useContext } from "react";
import { ViewHistoryContext } from "../contexts/ViewHistoryContextInstance";

export const useViewHistory = () => {
  const context = useContext(ViewHistoryContext);
  if (!context) {
    throw new Error("useViewHistory must be used within a ViewHistoryProvider");
  }
  return context;
}; 