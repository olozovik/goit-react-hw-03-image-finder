import { Component } from 'react';
import 'modern-normalize/modern-normalize.css';
import { Searchbar } from './components/Searchbar/Searchbar';
import { fetchImages } from 'api/fetchImages';

class App extends Component {
  state = {
    query: null,
    page: 1,
    images: [],
  };

  handleQuery = value => {
    const query = value
      .trim()
      .split(' ')
      .filter(item => item !== '' && item !== ' ')
      .join('+');
    this.setState({ query });
  };

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

  render() {
    return (
      <>
        <Searchbar handleQuery={this.handleQuery} />
      </>
    );
  }
}

export default App;
