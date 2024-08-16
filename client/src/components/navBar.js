import React from 'react';
import { fetchSecretFileByQuery } from '../redux/actions-files';
import { useDispatch } from 'react-redux'

export function NavBar({ setSearch, search }) {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      await dispatch(fetchSecretFileByQuery(search))
    } catch (error) {
      console.log("Error")
    }
  };

  return (
    <>
      <div>
        <nav class="navbar navbar-danger bg-danger ml-1">
        <span class="navbar-brand text-white" style={{ fontWeight: '700', marginLeft: '10px' }}>React Test App</span>
        <form class="form-inline d-flex" onSubmit={handleSubmit}>
          <input
            class="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{ marginRight: '10px', outline: 'none', border: '2px solid transparent' }}
            onChange={handleInputChange}
            />
          <button
            class="btn btn-success my-2 my-sm-0"
            type="submit"
            style={{ marginRight: '30px', background: '#f8f9fa', color: '#000000' }}
            onSubmit={handleSubmit}
            >
              Search
            </button>
        </form>
      </nav>
      </div>
    </>
  )
}

export default NavBar