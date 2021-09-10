import PropTypes from 'prop-types';

const ImageGalleryItem = ({ url, tags, onClick, largeImage }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={url}
        alt={tags}
        className="ImageGalleryItem-image"
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
