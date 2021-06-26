import React, { useState, useRef, useEffect } from 'react';
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
  const [isMessageTooLong, setIsMessageTooLong] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [giphy, setGiphy] = useState({ type: null, visible: false });
  const [isQuestionDisabled, setIsQuestionDisabled] = useState(false);
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!giphy.visible) inputRef.current.focus();
  }, [isDisabled, giphy.visible]);

  useEffect(() => {
    if (isDisabled) {
      setCurrentMessage('');
      setIsExpanded(false);
      setGiphy((prevGiphy) => ({ ...prevGiphy, visible: false }));
    }
  }, [isDisabled]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmpty(currentMessage)) {
      setIsMessageTooLong(false);
      emitMessage(currentMessage);
      setIsExpanded(false);
      setGiphy({ ...giphy, visible: false });
      setCurrentMessage('');
      inputRef.current.focus();
    }
  };

  const handleMessageChange = (e) => {
    const { value } = e.target;
    setIsMessageTooLong(false);

    if (value.length === 0) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }

    const MAX_LENGTH = 620;
    if (value.length > MAX_LENGTH) return setIsMessageTooLong(true);

    emitIsTyping();
    setCurrentMessage(value);
  };

  const askQuestion = () => {
    emitAskQuestion(askedQuestions);
    setIsQuestionDisabled(true);
    setTimeout(() => setIsQuestionDisabled(false), 30 * 1000);
  };

  const giphyComponent = giphy?.visible && !isDisabled && (
    <Giphy closeFn={() => setGiphy({ ...giphy, visible: false })} type={giphy?.type} />
  );

  return (
    <div
      className={`${styles.wrapper} ${isExpanded ? styles.expanded : ''} ${
        isDisabled ? styles.disabled : ''
      }`}
      ref={wrapperRef}
    >
      {giphyComponent}
      <Button btnType="icon" onClick={() => setIsExpanded(false)}>
        <ArrowIcon />
      </Button>
      <div className={styles.actionButtons}>
        <Button
          btnType="icon"
          onClick={() => setGiphy({ visible: true, type: giphyContentTypes.sticker })}
        >
          <EmojiIcon />
        </Button>
        <Button
          btnType="icon"
          onClick={() => setGiphy({ visible: true, type: giphyContentTypes.gif })}
        >
          <GifIcon />
        </Button>
        <Button btnType="icon" onClick={askQuestion} disabled={isQuestionDisabled}>
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
        error={isMessageTooLong}
        ref={inputRef}
      />
      <Button btnType="icon" onClick={handleSubmit}>
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
