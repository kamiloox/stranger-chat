import React from 'react';
import styles from '../styles/ChatMessage.module.scss';
import PropTypes from 'prop-types';
import Paragraph from './Paragraph';

const ChatMessage = ({ children, received, date, detected }) => {
  let message = children.trim();

  if (detected?.links) {
    message = message.split(' ').map((text) => {
      const { links } = detected;
      if (!links.includes(text)) return text + ' ';

      const link = links[links.indexOf(text)];
      return (
        <>
          <a href={link} target="_blank" rel="noreferrer" className={styles.link}>
            {link}
          </a>{' '}
        </>
      );
    });
  }

  return (
    <div
      className={`${styles.wrapper} ${received ? styles.received : ''}`}
      title={new Date(date).toDateString()}
    >
      <Paragraph>{message}</Paragraph>
    </div>
  );
};

ChatMessage.propTypes = {
  children: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  received: PropTypes.bool,
};

ChatMessage.defaultProps = {
  received: false,
};

export default ChatMessage;
