import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext(null);

function StateProvider({ reducer, initState, children }) {
  return (
    <StateContext.Provider
      // @ts-ignore
      value={useReducer(reducer, initState)}
    >
      {children}
    </StateContext.Provider>
  );
}

export default StateProvider;
export const useStateValue = () => useContext(StateContext);
