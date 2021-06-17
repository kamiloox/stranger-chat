import React, { useEffect, useState, createContext, useContext } from 'react';
import { offGetUserId, onGetUserId } from '../api/events';

export const UserContext = createContext({});

export const useUser = () => {
  const { userId } = useContext(UserContext);
  return { userId };
};

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    onGetUserId(setUserId);

    return () => offGetUserId();
  }, []);

  return <UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>;
};
