import React, { createContext, useState } from "react";

export const StopContext = createContext();

export const StopProvider = props => {
  const [stop, setStop] = useState({
    stopID: "600014",
    lat: -27.465841,
    lon: 153.026069
  });

  return (
    <StopContext.Provider value={[stop, setStop]}>
      {props.children}
    </StopContext.Provider>
  );
};
