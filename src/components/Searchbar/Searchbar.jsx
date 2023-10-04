import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SearchbarBox } from './Searchbar.styled';

export function Searchbar({ onSubmit}) {
  const [requestName, setRequest] = useState('')

  const handleInputChange = e => {
   setRequest(e.currentTarget.value.toLowerCase());
  };
  
  const handleSubmit = e => {
    e.preventDefault();

    if (requestName.trim() === '') {
      return toast.error('Please write your request');
    }

    onSubmit(requestName);

    setRequest('');
  };

    return (
      <SearchbarBox>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            type="text"
            name="requestName"
            value={requestName}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleInputChange}
          />
        </form>
      </SearchbarBox>
    );
  
}