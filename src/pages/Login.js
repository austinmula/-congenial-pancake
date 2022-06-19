import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  VStack,
  Button,
} from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data));
    navigate('/feed', { replace: true });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    //Create an object for the current input field
    const currentInputFieldData = {
      [name]: value,
    };

    //Merge the data object with the current input field data object
    const updatedData = {
      ...data,
      ...currentInputFieldData,
    };
    setData(updatedData);
  };
  return (
    <Container maxW='4xl' minH='100vh'>
      <Flex align='center' justify='center' minH='100vh'>
        <Box w={['full', '400px']} p={3} borderRadius='md' shadow='md'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <VStack spacing={6}>
              <FormControl isRequired>
                <FormLabel htmlFor='username'>username</FormLabel>
                <Input
                  required
                  name='username'
                  type='text'
                  placeholder='Enter Username'
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor='password'>password</FormLabel>
                <Input
                  required
                  name='password'
                  type='password'
                  placeholder='*****'
                  onChange={handleChange}
                />
              </FormControl>
              <Button type='submit' w='full' colorScheme='telegram'>
                LogIn
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
