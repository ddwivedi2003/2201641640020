import React from 'react';
import { Box, Typography } from '@mui/material';
import UrlShortenerForm from '../components/UrlShortenerForm';
import UrlList from '../components/UrlList';

const Home: React.FC = () => (
  <Box>
    <Typography variant="h5" mb={2}>
      Affordmed URL Shortener
    </Typography>
    <UrlShortenerForm />
    <Box mt={3}>
      <UrlList />
    </Box>
  </Box>
);

export default Home;