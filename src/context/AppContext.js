import React, { useEffect, useState, createContext, useContext } from 'react';
import { instantiateWS, onConnect } from '../api/events';

export const AppContext = createContext({});

export const useApp = () => {
  const { userId } = useContext(AppContext);

  return { userId };
};

export const AppProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const PERSISTENT_ID = 'persistent-id';
    const persistentId = window.localStorage.getItem(PERSISTENT_ID);
    instantiateWS(persistentId);
    onConnect((socket) => {
      setUserId(socket.id);

      if (!persistentId) {
        window.localStorage.setItem(PERSISTENT_ID, socket.id);
        instantiateWS(socket.id);
      }
    });
  }, []);

  return <AppContext.Provider value={{ userId }}>{children}</AppContext.Provider>;
};
