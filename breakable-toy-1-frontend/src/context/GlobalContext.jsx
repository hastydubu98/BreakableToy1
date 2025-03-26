import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [refreshSignal, setRefreshSignal] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
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