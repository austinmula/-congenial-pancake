import { Spinner, Center, Container, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Post from '../components/Post';
import Share from '../components/Share';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const DEV = process.env.NODE_ENV !== 'production';
      const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
      const response = await axios.get(
        `${DEV ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`
      );
      if (response) {
        setData(response.data.sort((a, b) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const postData = async (newdata) => {
    try {
      //   check if prodution or dev
      const DEV = process.env.NODE_ENV !== 'production';
      const { REACT_APP_DEV_URL, REACT_APP_PROD_URL } = process.env;
      const response = await axios.post(
        `${DEV ? REACT_APP_DEV_URL : REACT_APP_PROD_URL}`,
        newdata
      );
      if (response.data) {
        setData(
          [...data, response.data].sort((a, b) => b.timestamp - a.timestamp)
        );
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container maxW='2xl' minH='100vh' p={3} bg='blackAlpha.100'>
      <VStack spacing={5}>
        <Share postData={postData} setIsLoading={setIsLoading} />

        {isLoading && (
          <Center>
            <Spinner size='xl' />
          </Center>
        )}

        {data.length > 0 &&
          data.map((post) => <Post key={post.id} post={post} />)}
      </VStack>
    </Container>
  );
};

export default Home;
