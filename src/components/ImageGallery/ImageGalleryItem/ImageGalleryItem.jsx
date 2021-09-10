import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, tags, onClick, largeImage }) => {
  return (
    <li className={s.item}>
      <img
        className={s.image}
        src={url}
        alt={tags}
        onClick={() => onClick(largeImage)}
      />
    </li>
  );
};

export { ImageGalleryItem };

ImageGalleryItem.propTypes = {
  url: PropTypes.string,
  tags: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  largeImage: PropTypes.string,
};
