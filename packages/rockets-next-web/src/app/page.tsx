'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Home = () => {
  const router = useRouter();

  const checkAccessToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    router.replace(accessToken ? '/showroom/home' : '/login');
  };

  useEffect(() => {
    checkAccessToken();
  }, []);

  return (
    <main>
      <Box display="flex" flex={1} justifyContent="center" pt="30vh">
        <CircularProgress />
      </Box>
    </main>
  );
};

export default Home;