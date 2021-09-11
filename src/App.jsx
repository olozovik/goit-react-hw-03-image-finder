import { Component } from 'react';
import 'modern-normalize/modern-normalize.css';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchImages } from 'api/fetchImages';
import { ImageGallery } from './components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import { ButtonMore } from './components/ButtonMore/ButtonMore';
import { Loader } from 'components/Loader/Loader';

class App extends Component {
  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    const getImages = async () => {
      this.setState({ status: 'pending' });
      const data = await fetchImages({ page, query });
      this.setState({ totalHits: data.data.totalHits });
      return data.data.hits;
    };

    if (prevState.query !== query) {
      if (query.trim() === '' || query.length < 2) {
        return;
      }
      const receivedImages = await getImages();
      this.setState({
        images: receivedImages,
      });
      this.setState({
        quantityImages: this.state.images.length,
        status: 'resolved',
      });
    }

    if (prevState.page !== page) {
      const receivedImages = await getImages();
      this.setState(p => ({
        images: [...p.images, ...receivedImages],
      }));
      this.setState({
        quantityImages: this.state.images.length,
        status: 'resolved',
      });
    }
  }

  state = {
    query: null,
    page: 1,
    images: [],
    quantityImages: 0,
    totalHits: 0,
    selectedImage: null,
    status: 'idle',
  };

  handleQuery = value => {
    const query = value
      .trim()
      .split(' ')
      .filter(item => item !== '' && item !== ' ')
      .join('+');
    this.setState({ query });
  };

  handleClickImage = largeImage => {
    this.setState({ selectedImage: largeImage });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  handleBackdropClose = e => {
    if (e.target.nodeName !== 'IMG') {
      this.handleCloseModal();
    }
  };

  handleClickLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { selectedImage, images, status, quantityImages, totalHits } =
      this.state;

    const isLoadPossible = images.length > 0 && quantityImages < totalHits;
    const isLoading = status === 'pending';

    return (
      <>
        <Searchbar handleQuery={this.handleQuery} />
        {isLoading && <Loader />}
        <ImageGallery
          images={images}
          handleClickImage={this.handleClickImage}
        />
        {isLoadPossible && (
          <ButtonMore handleClickLoadMore={this.handleClickLoadMore} />
        )}
        {selectedImage && (
          <Modal
            url={selectedImage}
            images={images}
            handleCloseModal={this.handleCloseModal}
            handleBackdropClose={this.handleBackdropClose}
          />
        )}
      </>
    );
  }
}

export { App };
