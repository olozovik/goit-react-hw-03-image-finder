import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, handleClickImage }) => {
  return (
    <ul className="ImageGallery">
      {images.map(image => (
        <ImageGalleryItem
          key={image.id}
          url={image.webformatURL}
          largeImage={image.largeImageURL}
          tags={image.tags}
          onClick={handleClickImage}
        />
      ))}
    </ul>
  );
};

export { ImageGallery };

ImageGallery.propTypes = {
  images: PropTypes.array,
  handleClickImage: PropTypes.func.isRequired,
};
