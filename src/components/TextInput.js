import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/TextInput.module.scss';

const resetTextareaHeight = (current) => {
  if (current) current.style.height = '32px';
};

const updateTextareaHeight = (current) => {
  if (!current) return;

  resetTextareaHeight(current);

  const BORDER_BOTTOM = 7;
  const newHeight = current.scrollHeight + BORDER_BOTTOM;
  current.style.height = `${newHeight}px`;
};

const components = {
  input: 'input',
  textarea: 'textarea',
};

const TextInput = forwardRef(({ as, onSubmit, onChange, ...rest }, ref) => {
  useEffect(() => {
    ref.current.focus();
  }, [ref]);

  const Component = components[as];

  const handleEnter = (e) => {
    const ENTER_KEY = 'Enter';

    if (e.shiftKey && e.key === ENTER_KEY) return;

    if (e.key === ENTER_KEY && onSubmit) {
      e.preventDefault();
      onSubmit(e);
      if (as === components.textarea) resetTextareaHeight(ref.current);
    }
  };

  return (
    <Component
      onKeyDown={handleEnter}
      onInput={() => as === components.textarea && updateTextareaHeight(ref.current)}
      onChange={onChange}
      ref={ref}
      className={styles.textInput}
      {...rest}
    />
  );
});

TextInput.propTypes = {
  as: PropTypes.oneOf([components.input, components.textarea]),
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

TextInput.defaultProps = {
  as: components.textarea,
  onSubmit: null,
  onChange: null,
};

export default TextInput;
