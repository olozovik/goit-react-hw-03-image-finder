import { Component } from 'react';
import 'modern-normalize/modern-normalize.css';
import { Searchbar } from './components/Searchbar/Searchbar';

class App extends Component {
  state = {
    query: null,
  };

  handleQuery = value => {
    const query = value
      .trim()
      .split(' ')
      .filter(item => item !== '' && item !== ' ')
      .join('+');
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Searchbar handleQuery={this.handleQuery} />
      </>
    );
  }
}

export default App;
