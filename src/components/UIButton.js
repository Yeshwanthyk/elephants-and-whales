import React from 'react';
import { Button } from '@chakra-ui/core';

const UIButton = ({ onClick, children, ...props }) => {
  console.log(props);
  return (
    <Button my={4} onClick={onClick}>
      {children}
    </Button>
  );
};

export default UIButton;
