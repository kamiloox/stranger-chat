import React, { useState, createContext, useContext } from 'react';

export const ChatContext = createContext({});

export const useChatKeywords = () => {
  const { keywords, setKeywords } = useContext(ChatContext);
  
  const addKeyword = (keyword) => {
    const isKeywordDefined = keywords.includes(keyword);
    if (!isKeywordDefined && keyword.length !== 0) {
      setKeywords([...keywords, keyword]);
    }
  };

  const removeKeyword = (value) => {
    setKeywords(keywords.filter((toRemove) => toRemove !== value));
  };

  return { keywords, addKeyword, removeKeyword };
}

export const ChatProvider = ({ children }) => {
  const [keywords, setKeywords] = useState([]);

  const value = {
    keywords, 
    setKeywords
  }

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};