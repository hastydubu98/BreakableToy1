import React, { createContext, useState } from "react";

// Create a context to manage global state
export const GlobalContext = createContext();

/**
 * GlobalProvider component to wrap the application and provide global state.
 * @param {ReactNode} children - The child components that will consume the context.
 */
export const GlobalProvider = ({ children }) => {
  // State to trigger refresh actions across components
  const [refreshSignal, setRefreshSignal] = useState(false);

  // State to track the success of delete operations
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  // State to manage filters applied to the product list
  const [newFilter, setNewFilter] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        refreshSignal,
        setRefreshSignal,
        deleteSuccess,
        setDeleteSuccess,
        newFilter,
        setNewFilter,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};