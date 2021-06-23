import React, { useState } from 'react';
import styles from '../styles/KeywordList.module.scss';
import { useChatKeywords } from '../context/ChatContext';
import KeywordItem from './KeywordItem';
import TextInput from './TextInput';
import Button from './Button';

const KeywordList = () => {
  const [currentKeyword, setCurrentKeyword] = useState('');
  const { keywords, addKeyword, removeKeyword } = useChatKeywords();

  const handleSubmit = (e) => {
    e.preventDefault();
    addKeyword(currentKeyword);
    setCurrentKeyword('');
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.keywordsWrapper}>
        {keywords.map((keyword, i) => (
          <KeywordItem key={`${i}-${Date.now()}`} removeFn={() => removeKeyword(keyword)}>
            {keyword}
          </KeywordItem>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <TextInput 
          as="input" 
          onChange={(e) => setCurrentKeyword(e.target.value)}
          placeholder="Dodaj słowo kluczowe"
          value={currentKeyword}
        />
        <Button type="submit">dodaj</Button>
      </form>
    </div>
  );
};

export default KeywordList;
