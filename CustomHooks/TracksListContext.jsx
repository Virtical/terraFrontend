import React, { createContext, useContext, useState } from 'react';

const TracksListContext = createContext();

export const useTracksListContext = () => {
  return useContext(TracksListContext);
};

export async function UploadTracksData(setTracksList) {
  const response = await fetch('https://arseniy1206-terrabackend-aad7.twc1.net/api/Ways')
  const data = await response.json();
  let ways = data.map(item => {
      return {
          ...item,
          active: false
      };
  });

  setTracksList(ways);
}


export const TracksListProvider = ({ children }) => {
  const [tracksList, setTracksList] = useState([]);

  return (
    <TracksListContext.Provider value={{ tracksList, setTracksList }}>
      {children}
    </TracksListContext.Provider>
  );
};