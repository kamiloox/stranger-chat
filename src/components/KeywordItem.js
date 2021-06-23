import React from 'react';
import { ReactComponent as CloseIcon } from '../assets/closeIcon.svg';
import Button from './Button';

const KeywordItem = ({ children, removeFn }) => (
  <Button onClick={() => removeFn(children)} keyword>
    {children}
    <CloseIcon />
  </Button>
);

export default KeywordItem;
