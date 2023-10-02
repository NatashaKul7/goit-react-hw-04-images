import { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarBox } from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    requestName: '',
  };

  handleInputChange = e => {
    this.setState({ requestName: e.currentTarget.value.toLowerCase() });
  };
  handleSubmit = e => {
    e.preventDefault();

    if (this.state.requestName.trim() === '') {
      return toast.error('Please write your request');
    }

    this.props.onSubmit(this.state.requestName);

    this.setState({ requestName: '' });
  };

  render() {
    return (
      <SearchbarBox>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            name="requestName"
            value={this.state.requestName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
          />
        </form>
      </SearchbarBox>
    );
  }
}
