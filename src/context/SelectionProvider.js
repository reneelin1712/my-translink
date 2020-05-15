import React, { createContext, useState } from "react";

export const SelectionContext = createContext();

export const SelectionProvider = props => {
  const [selection, setSelection] = useState({
    stop_name: "Griffith University, platform 1"
  });

  return (
    <SelectionContext.Provider value={[selection, setSelection]}>
      {props.children}
    </SelectionContext.Provider>
  );
};
