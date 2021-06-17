import React, { createContext, useContext, useState } from 'react';

const GiphyContext = createContext(null);

export const useGiphy = () => {
  const { searchKey, setSearchKey } = useContext(GiphyContext);

  return { searchKey, setSearchKey };
};

const GiphyProvider = ({ children }) => {
  const [searchKey, setSearchKey] = useState('');

  return (
    <GiphyContext.Provider value={{ searchKey, setSearchKey }}>{children}</GiphyContext.Provider>
  );
};

export { GiphyContext, GiphyProvider };
