import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ children, received }) => (
  <div style={{ textAlign: received ? 'right' : 'left' }}>
    <p>{children}</p>
  </div>
);

Message.propTypes = {
  children: PropTypes.string.isRequired,
  received: PropTypes.bool,
};

Message.defaultProps = {
  received: true,
};

export default Message;
