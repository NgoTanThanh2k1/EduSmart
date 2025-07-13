import React, { useReducer, useEffect } from "react";
import { FavoritesContext } from "./FavoritesContextInstance";

// Favorites reducer
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (!existingItem) {
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
      return state;
    }

    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR_FAVORITES":
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

// Favorites provider component
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    items: [],
  });

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      const parsedFavorites = JSON.parse(savedFavorites);
      parsedFavorites.items.forEach((item) => {
        dispatch({ type: "ADD_TO_FAVORITES", payload: item });
      });
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(state));
  }, [state]);

  // Calculate total favorites
  const totalFavorites = state.items.length;

  const addToFavorites = (course) => {
    dispatch({ type: "ADD_TO_FAVORITES", payload: course });
  };

  const removeFromFavorites = (courseId) => {
    dispatch({ type: "REMOVE_FROM_FAVORITES", payload: courseId });
  };

  const clearFavorites = () => {
    dispatch({ type: "CLEAR_FAVORITES" });
  };

  const isInFavorites = (courseId) => {
    return state.items.some((item) => item.id === courseId);
  };

  const toggleFavorite = (course) => {
    if (isInFavorites(course.id)) {
      removeFromFavorites(course.id);
    } else {
      addToFavorites(course);
    }
  };

  const value = {
    items: state.items,
    totalFavorites,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isInFavorites,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
