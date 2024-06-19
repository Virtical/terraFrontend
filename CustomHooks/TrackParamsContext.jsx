import React, { createContext, useContext, useState } from 'react';

const TrackParamsContext = createContext();

export const useTrackParamsContext = () => {
  return useContext(TrackParamsContext);
};

export const ResetTrackParams = (setCreationTrackParams) => {
  setCreationTrackParams(() => ({
    track: [],
    mode: 0,
    season: 0,
    transport: 0,
    distance: 0,
    checkpoints: []
  }))
}

export const TrackParamsProvider = ({ children }) => {
  const [creationTrackParams, setCreationTrackParams] = useState({
    track: [],
    mode: 0,
    season: 0,
    transport: 0,
    distance: 0,
    checkpoints: []
  });

  return (
    <TrackParamsContext.Provider value={{ creationTrackParams, setCreationTrackParams }}>
      {children}
    </TrackParamsContext.Provider>
  );
};