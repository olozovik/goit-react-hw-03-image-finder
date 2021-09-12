import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import { Component } from 'react';

class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
    handleClickImage: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.images !== this.props.images &&
      this.props.images.length > 12 &&
      window.matchMedia('(min-width: 1600px)').matches
    ) {
      window.scrollTo({
        top: document.documentElement.scrollHeight - 1090,
        behavior: 'smooth',
      });
    }
  }

  render() {
    const { images, handleClickImage } = this.props;
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
  }
}

export { ImageGallery };
