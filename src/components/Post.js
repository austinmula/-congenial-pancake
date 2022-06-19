import React from 'react';
import { Box, Image, Avatar, Stack, Text, AspectRatio } from '@chakra-ui/react';
import moment from 'moment';

const Post = ({ post }) => {
  return (
    <Box w='100%' overflow='hidden' shadow='md' borderRadius='md' bg='white'>
      {/* Image */}
      {post.image && (
        <Box h='250px'>
          <Image
            src={post.image}
            w='100%'
            h='100%'
            layout={'fill'}
            objectFit='cover'
          />
        </Box>
      )}

      {/* Video */}
      {post.video && (
        <Box h='250px'>
          <AspectRatio ratio={3 / 1}>
            <iframe title='naruto' src={post.video} allowFullScreen />
          </AspectRatio>
        </Box>
      )}
      {/* Below */}
      <Box p={5}>
        <Stack direction={'row'} spacing={4} align={'center'}>
          <Avatar
            name={post.username}
            src='https://bit.ly/broken-link'
            alt={'Author'}
            size='sm'
          />

          <Text fontWeight={600}>{post.author}</Text>
        </Stack>
        <Text color={'gray.500'} mt={2}>
          {post.text}
        </Text>

        <Text color={'gray.500'} mt={2} fontSize='xs'>
          {moment(post.timestamp).fromNow()}
        </Text>
      </Box>
    </Box>
  );
};

export default Post;
