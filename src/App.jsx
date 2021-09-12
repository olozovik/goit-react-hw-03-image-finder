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
    const getImages = async (page, query) => {
      this.setState({ status: 'pending' });
      const data = await fetchImages({ page, query });
      this.setState({ totalHits: data.data.totalHits });
      return data.data.hits;
    };

    const setImages = receivedImages => {
      if (prevState.page !== this.state.page) {
        this.setState(p => ({
          images: [...p.images, ...receivedImages],
        }));
      }
      if (prevState.query !== this.state.query) {
        this.setState({
          images: receivedImages,
        });
      }
    };

    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      if (this.state.query.trim() === '' || this.state.query.length < 2) {
        return;
      }
      if (prevState.query !== this.state.query && this.state.page > 1) {
        this.setState({ page: 1, images: [] });
        return;
      }
      const receivedImages = await getImages(this.state.page, this.state.query);
      setImages(receivedImages);
      this.setState({ quantityImages: this.state.images.length });
      this.setState({ status: 'resolved' });
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
