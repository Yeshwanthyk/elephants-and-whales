import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

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

const FileSelect = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    let reader = new FileReader();
    let file = data.file[0];

    reader.onloadend = () => {
      setPrimaryImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input type="file" name="file" id="file" ref={register} />
      <InputLabel htmlFor="file">Choose a file</InputLabel>
      {errors.selectFile && <span>This field is required</span>}
      <input type="submit" />
    </form>
  );
};

export default FileSelect;
