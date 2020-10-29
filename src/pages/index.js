import Head from 'next/head';
import styled from 'styled-components';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Flex, Image as ChakraImage } from '@chakra-ui/core';
import UIButton from '../components/UIButton';
import PrimaryImage from '../components/PrimaryImage';
import RandImage from '../components/RandImage';

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
  const [isFlipped, setIsFlipped] = useState(false);

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

  const flipImages = () => {
    let [tempPrimary, tempRand] = [randImage, primaryImage];
    setIsFlipped(!isFlipped);
    setPrimaryImage(tempPrimary);
    setRandImage(tempRand);
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
            <Flex align="center" justify="center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Input type="file" name="file" id="file" ref={register} />
                <InputLabel htmlFor="file">Choose a file</InputLabel>
                {errors.selectFile && <span>This field is required</span>}
                <input type="submit" />
              </form>
            </Flex>
            <Flex justify="space-evenly">
              <UIButton onClick={shuffleImages}> Rand </UIButton>
              <UIButton onClick={flipImages}> Flip </UIButton>
            </Flex>
          </Box>

          {!isFlipped && (
            <>
              <Flex align="center" justify="center" m={4}>
                <PrimaryImage img={primaryImage} />
                <RandImage public_id={randImage} />
              </Flex>
            </>
          )}
          {isFlipped && (
            <>
              <Flex align="center" justify="center" m={4}>
                <RandImage public_id={primaryImage} />
                <PrimaryImage img={randImage} />
              </Flex>
            </>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
