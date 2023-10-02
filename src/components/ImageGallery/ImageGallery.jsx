import { Component } from 'react';

import { fetchRequest } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { StyledGallery } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { scrollToBottom } from 'utils/scroll';

export class ImageGallery extends Component {
  state = {
    request: [],
    modal: {
      isOpen: false,
      data: null,
      tags: '',
    },
    error: null,
    page: 1,
    status: 'idle',
    hasMore: false,
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevRequest = prevProps.requestName;
    const nextRequest = this.props.requestName;

    if (prevRequest !== nextRequest) {
      this.setState({ request: [] });
      this.setState({ status: 'pending' });

      this.getRequestedImages(nextRequest);
    }
  }

  getRequestedImages = async (name, page) => {
    try {
      this.setState({ status: 'pending' });
      const {hits, totalHits} = await fetchRequest(name, page);



      if (hits.length > 0) {
        this.setState(prevState => ({
          request: [...prevState.request, ...hits],
          status: 'resolved',
          page: prevState.page + 1,
          hasMore: this.state.page < Math.ceil(totalHits / 12)
        
        }));
      } else if (this.state.request === 1) {
        this.setState({ status: 'resolved', hasMore: false });
      } else {
        this.setState({ status: 'resolved', hasMore: false });
      }

      if (totalHits === 0) {
        throw new Error("Ooops, we couldn't find such images");
      }
    } catch (error) {
      this.setState({
        error: error.message,
        status: 'rejected',
        hasMore: false,
      });
    }
  };

  onLoadMore = () => {
    const { page } = this.state;
    const { requestName } = this.props;
    this.getRequestedImages(requestName, page);
    scrollToBottom();
  };

  onOpenModal = (modalData, tags) => {
    this.setState({
      modal: {
        isOpen: true,
        data: modalData,
        tags,
      },
    });
  };

  onCloseModal = () => {
    this.setState({
      modal: {
        isOpen: false,
        data: null,
      },
    });
  };

  render() {
    const showImg =
      Array.isArray(this.state.request) && this.state.request.length;

    const { modal, request, error, status, hasMore } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <h3>{error}</h3>;
    }

    if (status === 'resolved') {
      return (
        <>
          {showImg && (
            <>
              <h2>Result "{this.props.requestName}"</h2>
              <StyledGallery>
                <ImageGalleryItem
                  data={this.state.request}
                  onOpenModal={this.onOpenModal}
                />
              </StyledGallery>
            </>
          )}
          {!hasMore && <h3>There's no more images to load</h3>}
          {hasMore && request && <Button onClick={this.onLoadMore} />}
          {modal.isOpen && (
            <Modal onCloseModal={this.onCloseModal}>
              <img src={modal.data} alt={modal.tags} />
            </Modal>
          )}
        </>
      );
    }
  }
}
