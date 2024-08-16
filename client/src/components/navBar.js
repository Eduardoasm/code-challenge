import React from 'react';
import { fetchSecretFileByQuery } from '../redux/actions-files';
import { useDispatch } from 'react-redux'
import { Toast } from 'bootstrap/dist/js/bootstrap.bundle.min';

export function NavBar({ setSearch, search }) {
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(fetchSecretFileByQuery(search));
    } catch (error) {
      showToast('Invalid file name');
    }
  };

  const showToast = (message) => {
    const toastElement = document.getElementById('errorToast');
    const toast = new Toast(toastElement);
    toastElement.querySelector('.toast-body').textContent = message;
    toast.show();
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
      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div id="errorToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Error</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
          </div>
        </div>
      </div>
    </>
  )
}

export default NavBar