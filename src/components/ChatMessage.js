import React from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import styles from '../styles/ChatMessage.module.scss';
import Paragraph from './Paragraph';

const ChatMessage = ({ children, received, date }) => (
  <div className={`${styles.wrapper} ${received ? styles.received : ''}`}>
    <div title={new Date(date).toDateString()} className={styles.item}>
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

ChatMessage.propTypes = {
  children: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  received: PropTypes.bool,
};

ChatMessage.defaultProps = {
  received: false,
};

export default ChatMessage;
