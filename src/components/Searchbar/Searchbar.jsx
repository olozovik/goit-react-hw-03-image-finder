import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DebounceInput } from 'react-debounce-input';
import { FaSearch } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    value: null,
  };

  onChange = e => {
    const value = e.target.value;
    this.setState({ value });
    this.props.handleQuery(value);
  };

  render() {
    const inputId = uuidv4();
    return (
      <header className="Searchbar">
        <form className="SearchForm">
          <label htmlFor={inputId}>
            <FaSearch />
            <DebounceInput
              debounceTimeout={500}
              id={inputId}
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.value}
              onChange={this.onChange}
            />
          </label>
        </form>
      </header>
    );
  }
}

export { Searchbar };
