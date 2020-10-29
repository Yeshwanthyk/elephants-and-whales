import React from 'react';
import { Box, Image } from '@chakra-ui/core';

const PrimaryImage = ({ img }) => {
  return (
    <Box px={4}>
      <Image src={img} />
    </Box>
  );
};

export default PrimaryImage;
