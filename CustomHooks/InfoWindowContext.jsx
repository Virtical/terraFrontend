import React, { createContext, useContext, useState } from 'react';

const InfoWindowContext = createContext();

export const useInfoWindowContext = () => {
  return useContext(InfoWindowContext);
};

export const ResetInfoWindow = (setCreationTrackParams) => {
  setCreationTrackParams({})
}

export const InfoWindowProvider = ({ children }) => {
  const [infoWindowParams, setInfoWindowParams] = useState({});

  return (
    <InfoWindowContext.Provider value={{ infoWindowParams, setInfoWindowParams }}>
      {children}
    </InfoWindowContext.Provider>
  );
};