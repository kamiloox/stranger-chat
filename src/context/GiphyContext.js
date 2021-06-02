import React, { createContext, useState } from 'react';

const GiphyContext = createContext(null);

const GiphyProvider = ({ children }) => {
  const [searchKey, setSearchKey] = useState('');

  return (
    <GiphyContext.Provider value={{ searchKey, setSearchKey }}>{children}</GiphyContext.Provider>
  );
};

export { GiphyContext, GiphyProvider };
