import React, { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  Divider,
  Stack,
  FormLabel,
  Icon,
  Text,
  Button,
  Image,
  AspectRatio,
} from '@chakra-ui/react';
import { FaImage, FaVideo } from 'react-icons/fa';
import axios from 'axios';

const Share = ({ postData, setIsLoading }) => {
  const [text, setText] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [selectedVid, setSelectedVid] = useState('');

  const uploadPost = (e) => {
    e.preventDefault();

    if (!text) return;

    var name = JSON.parse(localStorage.getItem('user'));
    setIsLoading(true);
    if (!selectedFile && !selectedVid) {
      var data = {
        image: '',
        video: '',
        text: text,
        timestamp: Date.now(),
        author: name.username,
      };

      postData(data);
    }

    // If image is uploaded
    if (selectedFile) {
      const formdata = new FormData();
      formdata.append('file', selectedFile);
      formdata.append('upload_preset', 'omqt3tfy');

      axios
        .post(
          'https://api.cloudinary.com/v1_1/dgcnhsz9h/image/upload',
          formdata
        )
        .then((response) => {
          console.log(response);
          var data = {
            image: response.data.url ? response.data.url : '',
            video: '',
            text: text,
            timestamp: Date.now(),
            author: name.username,
          };

          postData(data);
          setSelectedFile('');
          setText('');
        });
    }

    // If Video is uploaded
    if (selectedVid) {
      const formdata = new FormData();
      formdata.append('file', selectedVid);
      formdata.append('upload_preset', 'omqt3tfy');

      axios
        .post('https://api.cloudinary.com/v1_1/dgcnhsz9h/upload', formdata)
        .then((response) => {
          console.log(response);
          var data = {
            image: '',
            video: response.data.url ? response.data.url : '',
            text: text,
            timestamp: Date.now(),
            author: name.username,
          };

          postData(data);
          setSelectedVid('');
          setText('');
        });
    }
  };

  const handleUploadChange = (e) => {
    const file = e.target.files[0];
    showPreview(file);
  };

  const handleVideoUploadChange = (e) => {
    const file = e.target.files[0];
    videoPreview(file);
  };

  const videoPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedVid(reader.result);
    };
  };

  const showPreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedFile(reader.result);
    };
  };

  return (
    <Box borderRadius='lg' shadow='xl' w='100%' h='auto' bg='white' px={7}>
      {/* Top */}
      <form onSubmit={(e) => uploadPost(e)}>
        <Flex h='8vh' align='center'>
          <Input
            type='text'
            name='text'
            placeholder='enter post details'
            variant={'unstyled'}
            py={3}
            size='xs'
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Flex>
        <Divider />

        {/* Bottom */}
        <Flex align='center' h='12vh' justify='space-between'>
          <Box>
            <Stack direction='row' spacing={3}>
              <FormLabel cursor='pointer'>
                <Flex align='center'>
                  <Icon as={FaImage} boxSize='16px' color='blue.700' />
                  <Text as='span' ml={2}>
                    Picture
                  </Text>
                  <Input
                    type='file'
                    accept='/image/*'
                    style={{ display: 'none' }}
                    onChange={handleUploadChange}
                  />
                </Flex>
              </FormLabel>

              <FormLabel cursor='pointer'>
                <Flex align='center'>
                  <Icon as={FaVideo} boxSize='16px' color='gray.700' />
                  <Text as='span' ml={2}>
                    Video
                  </Text>
                  <Input
                    type='file'
                    accept='video/mp4,video/x-m4v,video/*'
                    style={{ display: 'none' }}
                    onChange={handleVideoUploadChange}
                  />
                </Flex>
              </FormLabel>
            </Stack>
          </Box>
          <Box>
            <Button size='sm' colorScheme='whatsapp' type='submit'>
              Share Post
            </Button>
          </Box>
        </Flex>
      </form>

      {selectedFile && (
        <Box h='200px'>
          <Image
            alt='preview img'
            src={selectedFile}
            w='100%'
            h='100%'
            // layout={'fill'}
            objectFit='contain'
          />
        </Box>
      )}
      {selectedVid && (
        <Box h='200px'>
          <AspectRatio maxW='560px' ratio={3 / 1}>
            <iframe title='naruto' src={selectedVid} allowFullScreen />
          </AspectRatio>
        </Box>
      )}
    </Box>
  );
};

export default Share;
