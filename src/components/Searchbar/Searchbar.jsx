import { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DebounceInput } from 'react-debounce-input';
import { FaSearch } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

const headerRoot = document.querySelector('#header-root');

class Searchbar extends Component {
  static propTypes = {
    handleQuery: PropTypes.func.isRequired,
  };

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
    return createPortal(
      <header className={s.header}>
        <div className={s.inputWrapper}>
          <label htmlFor={inputId} className={s.label}>
            <FaSearch className={s.icon} />
            <DebounceInput
              className={s.input}
              debounceTimeout={750}
              id={inputId}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.value}
              onChange={this.onChange}
            />
          </label>
        </div>
      </header>,
      headerRoot,
    );
  }
}

export { Searchbar };
