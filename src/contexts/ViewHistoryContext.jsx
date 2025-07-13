import React, { useReducer, useEffect } from "react";
import { ViewHistoryContext } from "./ViewHistoryContextInstance";

// View history reducer
const viewHistoryReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_HISTORY": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        // Move to top if already exists
        return {
          ...state,
          items: [
            action.payload,
            ...state.items.filter((item) => item.id !== action.payload.id),
          ],
        };
      } else {
        return {
          ...state,
          items: [action.payload, ...state.items],
        };
      }
    }

    case "REMOVE_FROM_HISTORY":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_HISTORY":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// View history provider component
export const ViewHistoryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(viewHistoryReducer, {
    items: [],
  });

  // Load view history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("viewHistory");
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      parsedHistory.items.forEach((item) => {
        dispatch({ type: "ADD_TO_HISTORY", payload: item });
      });
    }
  }, []);

  // Save view history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("viewHistory", JSON.stringify(state));
  }, [state]);

  // Calculate total history items
  const totalHistory = state.items.length;

  const addToHistory = (course) => {
    dispatch({ type: "ADD_TO_HISTORY", payload: course });
  };

  const removeFromHistory = (courseId) => {
    dispatch({ type: "REMOVE_FROM_HISTORY", payload: courseId });
  };

  const clearHistory = () => {
    dispatch({ type: "CLEAR_HISTORY" });
  };

  const isInHistory = (courseId) => {
    return state.items.some((item) => item.id === courseId);
  };

  const getRecentHistory = (limit = 5) => {
    return state.items.slice(0, limit);
  };

  const value = {
    items: state.items,
    totalHistory,
    addToHistory,
    removeFromHistory,
    clearHistory,
    isInHistory,
    getRecentHistory,
  };

  return (
    <ViewHistoryContext.Provider value={value}>
      {children}
    </ViewHistoryContext.Provider>
  );
};
