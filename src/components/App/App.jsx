import { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    requestName: '',
  };

  handleSearchSubmit = requestName => {
    this.setState({ requestName });
  };

  render() {
    return (
      <Container>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery requestName={this.state.requestName} />
        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

