import { StyledGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ data, onOpenModal }) => {
  return (
    <>
      {data.map(({ id, largeImageURL, webformatURL, tags }) => {
        return (
          <StyledGalleryItem
            key={id}
            onClick={() => onOpenModal(largeImageURL, tags)}
          >
            <img src={webformatURL} alt={tags} />
          </StyledGalleryItem>
        );
      })}
    </>
  );
};
