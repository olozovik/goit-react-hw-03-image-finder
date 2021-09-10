import { Component } from 'react';
import 'modern-normalize/modern-normalize.css';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchImages } from 'api/fetchImages';
import { ImageGallery } from './components/ImageGallery/ImageGallery';

class App extends Component {
  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    const data = await fetchImages({ page, query });
    const images = data.data.hits;

    if (prevState.query !== query) {
      this.setState({ images });
    }
    if (prevState.page !== page) {
      this.setState(p => ({ images: [...p.images, images] }));
    }
  }

  state = {
    query: null,
    page: 1,
    images: [],
    selectedImage: null,
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

  render() {
    return (
      <>
        <Searchbar handleQuery={this.handleQuery} />
        <ImageGallery
          images={this.state.images}
          handleClickImage={this.handleClickImage}
        />
      </>
    );
  }
}

export default App;
