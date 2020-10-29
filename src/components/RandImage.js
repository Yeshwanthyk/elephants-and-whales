import React from 'react';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { Box } from '@chakra-ui/core';

const RandImage = ({ public_id }) => {
  return (
    <Box>
      <CloudinaryContext cloudName="yesh">
        <Image publicId={public_id}>
          <Transformation
            crop="scale"
            dpr="auto"
            responsive_placeholder="blank"
          />
        </Image>
      </CloudinaryContext>
    </Box>
  );
};

export default RandImage;
