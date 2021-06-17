import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import styles from '../styles/ChatMessage.module.scss';
import Paragraph from './Paragraph';
import { emitterType } from '../helpers/emitterTemplate';

const ChatMessage = ({ children, received, date, config }) => {
  if (config.type === emitterType.gif) {
    return (
      <div className={`${styles.wrapper} ${received ? styles.received : ''}`}>
        <img src={children} className={styles.gif} alt="Obraz gifa" />
      </div>
    );
  }

  return (
    <div
      className={`${styles.wrapper} ${received ? styles.received : ''} ${
        config?.type === emitterType.question ? styles.question : ''
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
          <Paragraph>{children.trim()}</Paragraph>
        </Linkify>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  children: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  received: PropTypes.bool,
  config: PropTypes.object,
};

ChatMessage.defaultProps = {
  received: false,
  config: {},
};

export default ChatMessage;
