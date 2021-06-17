import React, { useState, useRef, createRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/ChatFooter.module.scss';
import { emitMessage, emitIsTyping, emitAskQuestion } from '../api/events';
import { ReactComponent as ArrowIcon } from '../assets/arrowIcon.svg';
import { ReactComponent as EmojiIcon } from '../assets/emojiIcon.svg';
import { ReactComponent as GifIcon } from '../assets/gifIcon.svg';
import { ReactComponent as SendIcon } from '../assets/sendIcon.svg';
import { ReactComponent as QuestionIcon } from '../assets/questionIcon.svg';
import Button from './Button';
import Giphy, { contentTypes as giphyContentTypes } from './Giphy';
import TextInput from './TextInput';

const isEmpty = (value) => value.length === 0;

const ChatFooter = ({ isDisabled, askedQuestions }) => {
  const [currentMessage, setCurrentMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [giphy, setGiphy] = useState({ type: giphyContentTypes.gif, visible: false });
  const [isQuestionDisabled, setIsQuestionDisabled] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = createRef(null);

  useEffect(() => {
    if (isDisabled) {
      setCurrentMessage('');
      setIsExpanded(false);
    }
  }, [isDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmpty(currentMessage)) {
      emitMessage(currentMessage);
      setIsExpanded(false);
      setGiphy({ ...giphy, visible: false });
      setCurrentMessage('');
      e.target.focus();
    }
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    if (giphy?.visible) return setCurrentMessage(value);

    if (value.length === 0) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }

    emitIsTyping();
    setCurrentMessage(value);
  };

  if (giphy?.visible) {
    return (
      <div className={`${styles.wrapper} ${styles.giphyWrapper}`}>
        <Giphy
          padding={20}
          closeFn={() => setGiphy({ ...giphy, visible: false })}
          type={giphy?.type}
        />
      </div>
    );
  }

  const askQuestion = () => {
    emitAskQuestion(askedQuestions);
    setIsQuestionDisabled(true);
    setTimeout(() => setIsQuestionDisabled(false), 30 * 1000);
  };

  return (
    <div
      className={`${styles.wrapper} ${isExpanded ? styles.expanded : ''} ${
        isDisabled ? styles.disabled : ''
      }`}
      ref={wrapperRef}
    >
      <Button type="icon" onClick={() => setIsExpanded(false)}>
        <ArrowIcon />
      </Button>
      <div className={styles.actionButtons}>
        <Button
          type="icon"
          onClick={() => setGiphy({ visible: true, type: giphyContentTypes.animatedText })}
        >
          <EmojiIcon />
        </Button>
        <Button
          type="icon"
          onClick={() => setGiphy({ visible: true, type: giphyContentTypes.gif })}
        >
          <GifIcon />
        </Button>
        <Button type="icon" onClick={askQuestion} disabled={isQuestionDisabled}>
          <QuestionIcon />
        </Button>
      </div>
      <TextInput
        onSubmit={handleSubmit}
        onChange={handleMessageChange}
        value={currentMessage}
        placeholder="Napisz wiadomość..."
        autoCorrect="off"
        disabled={isDisabled}
        ref={inputRef}
      />
      <Button type="icon" onClick={handleSubmit}>
        <SendIcon className={styles.icon} />
      </Button>
    </div>
  );
};

ChatFooter.propTypes = {
  isDisabled: PropTypes.bool,
};

ChatFooter.defaultProps = {
  isDisabled: false,
};

export default ChatFooter;
