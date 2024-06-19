import React, { createContext, useContext, useState } from 'react';

const ParametersContext = createContext();

export const useParametersContext = () => {
  return useContext(ParametersContext);
};

export const ParametersProvider = ({ children }) => {
  const [parameters, setParameters] = useState({});

  return (
    <ParametersContext.Provider value={{ parameters, setParameters }}>
      {children}
    </ParametersContext.Provider>
  );
};