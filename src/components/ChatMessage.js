import React from 'react';
import styles from '../styles/ChatMessage.module.scss';
import PropTypes from 'prop-types';
import Paragraph from './Paragraph';

const ChatMessage = ({ children, received, date, detected }) => {
  let message = children.trim();

  const { links } = detected;
  if (!!links.length) {
    message = message.split(' ').map((text, i) => {
      const link = links.find(({ src }) => src === text);
      if (!link) return text + ' ';

      return (
        <React.Fragment key={i}>
          <a href={link.src} target="_blank" rel="noreferrer" className={styles.linkInMessage}>
            {link.src}
          </a>
        </React.Fragment>
      );
    });
  }

  return (
    <div className={`${styles.wrapper} ${received ? styles.received : ''}`}>
      <div title={new Date(date).toDateString()} className={styles.item}>
        <Paragraph>{message}</Paragraph>
      </div>
      {!!links.length &&
        links.map(({ title, src, img, description }, i) => (
          <div className={`${styles.item} ${styles.linkWrapper}`}>
            <a key={i} href={src} target="_blank" rel="noreferrer">
              {title && <span className={styles.linkTitle}>{title}</span>}
              {img && <img src={img} className={styles.linkImg} alt="Logo strony z linku" />}
              {description && <span className={styles.linkDescription}>{description}</span>}
            </a>
          </div>
        ))}
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
