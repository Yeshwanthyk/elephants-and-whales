import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CloudinaryContext, Transformation, Image } from 'cloudinary-react';
import { Box, Button, Flex, Image as ChakraImage } from '@chakra-ui/core';

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const InputLabel = styled.label`
  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;
  cursor: pointer;
  margin-right: 2rem;
`;

export default function Home() {
  const [primaryImage, setPrimaryImage] = useState('');
  const [randImage, setRandImage] = useState('');

  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    let reader = new FileReader();
    let file = data.file[0];

    reader.onloadend = () => {
      setPrimaryImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const shuffleImages = (e) => {
    e.preventDefault();

    axios
      .get('https://res.cloudinary.com/yesh/image/list/rand.json')
      .then((res) => {
        let imgResources = res.data.resources;

        let selectedImg =
          imgResources[Math.floor(Math.random() * imgResources.length)];

        setRandImage(selectedImg.public_id);
      });
  };

  return (
    <Box>
      <Head>
        <title>Elephants and Whales</title>
        <link rel="icon" href="../src/assets/favicon.ico" />
      </Head>

      <Box>
        <Flex flexDirection="column" m={4}>
          <Box py={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input type="file" name="file" id="file" ref={register} />
              <InputLabel htmlFor="file">Choose a file</InputLabel>
              {errors.selectFile && <span>This field is required</span>}
              <input type="submit" />
            </form>
            <Button my={4} onClick={shuffleImages}>
              Rand
            </Button>
          </Box>

          <Flex align="center" justify="center" m={4}>
            <Box px={4}>
              <ChakraImage src={primaryImage} />
            </Box>
            <Box>
              <CloudinaryContext cloudName="yesh">
                <Image publicId={randImage}>
                  <Transformation
                    crop="scale"
                    dpr="auto"
                    responsive_placeholder="blank"
                  />
                </Image>
              </CloudinaryContext>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
