import React, { createContext, useContext, useState } from 'react';

const MarkerParamsContext = createContext();

export const useMarkerParamsContext = () => {
  return useContext(MarkerParamsContext);
};

export const ResetMarkerParams = (setCreationMarkerParams) => {
  setCreationMarkerParams(() => ({
    position: [],
    type: 0,
    name: "",
    description: "",
    photo: []
  }))
}

export const MarkerParamsProvider = ({ children }) => {
  const [creationMarkerParams, setCreationMarkerParams] = useState({
    position: [],
    type: 0,
    name: "",
    description: "",
    photo: []
  });

  return (
    <MarkerParamsContext.Provider value={{ creationMarkerParams, setCreationMarkerParams }}>
      {children}
    </MarkerParamsContext.Provider>
  );
};