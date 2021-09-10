import { Component } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseCircleOutline } from 'react-icons/io5';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
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
    return createPortal(
      <div
        className={s.backdrop}
        onClick={e => this.props.handleBackdropClose(e)}
      >
        <button
          className={s.button}
          type={'button'}
          aria-label={'Close'}
          onClick={this.props.handleCloseModal}
        >
          <IoCloseCircleOutline className={s.close} />
        </button>
        <div className={s.modal}>
          <img src={this.props.url} alt={this.getTags()} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export { Modal };
