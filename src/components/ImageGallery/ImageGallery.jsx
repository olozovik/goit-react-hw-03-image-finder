import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, handleClickImage }) => {
  return (
    <ul className={s.list}>
      {images.map(image => (
        <ImageGalleryItem
          key={`${image.id} ${image.webformatURL}`}
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
