import { useState, useEffect } from 'react';

import { fetchRequest } from 'services/api';
import { Loader } from 'components/Loader/Loader';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';
import { StyledGallery } from './ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { scrollToBottom } from 'utils/scroll';


export function ImageGallery({ requestName }) {
  const [request, setRequest] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [hasMore, setHasMore] = useState(false);
  const [image, setImage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!requestName) {
      return;
    }

    setRequest([]);
    setStatus('pending');

    getRequestedImages(requestName, page);
  }, [page, requestName]);

  const getRequestedImages = async (name, page) => {
    if (!name) return;
    setStatus('pending');

    try {
      setStatus('pending');
      const { hits, totalHits } = await fetchRequest(name, page);
      if (!name) return;

      if (hits.length > 0) {
        setRequest(prevState => [...prevState, ...hits]);
        setStatus('resolved');
        setHasMore(page < Math.ceil(totalHits / 12));
      } else if (page === 1) {
        setHasMore(false);
        setStatus('resolved');
      } else {
        setHasMore(false);
        setStatus('resolved');
      }

      if (totalHits === 0) {
        throw new Error("Ooops, we couldn't find such images");
      }
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
      setHasMore(false);
    }
  };

  const toggleModal = image => {
    setShowModal(!showModal);
    setImage(image);
  };

  const onLoadMore = () => {
    setPage(page + 1);
    scrollToBottom();
  };

  const showImg = Array.isArray(request) && request.length;

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
            <h2>Result "{requestName}"</h2>
            <StyledGallery>
              <ImageGalleryItem data={request} onOpenModal={toggleModal} />
            </StyledGallery>
          </>
        )}
        {!hasMore && <h3>There's no more images to load</h3>}
        {hasMore && request && <Button onClick={onLoadMore} />}
        {showModal && (
          <Modal onCloseModal={toggleModal}>
            <img src={image} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

