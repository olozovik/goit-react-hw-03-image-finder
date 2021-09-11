import { Component } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';
import s from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  static propTypes = {
    url: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
    handleCloseModal: PropTypes.func.isRequired,
    handleBackdropClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleEscClose);
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEscClose);
    document.body.style.overflow = 'auto';
  }

  getTags = () => {
    const { url, images } = this.props;
    const selectedImage = images.find(image => image.largeImageURL === url);
    if (selectedImage) {
      return selectedImage.tags;
    }
  };

  handleEscClose = e => {
    if (e.code === 'Escape') {
      this.props.handleCloseModal();
    }
  };

  render() {
    const { handleBackdropClose, handleCloseModal, url } = this.props;

    return createPortal(
      <div className={s.backdrop} onClick={e => handleBackdropClose(e)}>
        <button
          className={s.button}
          type={'button'}
          aria-label={'Close'}
          onClick={handleCloseModal}
        >
          <IoCloseCircleOutline className={s.close} />
        </button>
        <div className={s.modal}>
          <img src={url} alt={this.getTags()} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export { Modal };
