import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import styles from '../styles/ChatMessage.module.scss';
import Paragraph from './Paragraph';
import { emitterType } from '../helpers/emitterTemplate';
import { ReactComponent as BotIcon } from '../assets/botIcon.svg';

const ChatMessage = ({ children, received, date, tail }) => {
  if (tail.type === emitterType.gif) {
    return (
      <div className={`${styles.wrapper} ${received ? styles.received : ''}`}>
        <img src={children} className={styles.gif} alt="Obraz gifa" />
      </div>
    );
  }

  return (
    <div
      className={`${styles.wrapper} ${received ? styles.received : ''} ${
        tail?.type ? styles[tail.type] : ''
      }`}
    >
      <div title={new Date(date).toLocaleTimeString()} className={styles.item}>
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          {tail?.type === emitterType.info && <BotIcon className={styles.botIcon} />}
          <Paragraph>{children.trim()}</Paragraph>
        </Linkify>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  children: PropTypes.string.isRequired,
  date: PropTypes.number,
  received: PropTypes.bool,
  tail: PropTypes.object,
};

ChatMessage.defaultProps = {
  date: Date.now(),
  received: false,
  tail: {},
};

export default ChatMessage;
