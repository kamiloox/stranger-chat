import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ children, sent }) => (
  <div style={{ textAlign: sent ? 'left' : 'right' }}>
    <p>{children}</p>
  </div>
);

Message.propTypes = {
  children: PropTypes.string.isRequired,
  sent: PropTypes.bool,
};

Message.defaultProps = {
  sent: true,
};

export default Message;
