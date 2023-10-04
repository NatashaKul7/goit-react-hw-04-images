import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Container } from './App.styled';

export function App() {
  const [requestName, setRequestName] = useState('');

  return (
    <Container>
      <Searchbar onSubmit={setRequestName} />
      <ImageGallery requestName={requestName} />
      <ToastContainer autoClose={3000} />
    </Container>
  );
}
