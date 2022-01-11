import React from 'react';
import PropTypes from 'prop-types';

function NavBar(props) {
  const { onAddList, listLength } = props;

  const addListButton = (
    <button
      type="button"
      className="btn btn-lg btn-outline-primary d-flex"
      onClick={onAddList}
      disabled={!(listLength < 4)}
    >
      <b>New List</b>
    </button>
  );

  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid px-4">
        <h1 className="text-white">Todo List App</h1>
        {addListButton}
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  onAddList: PropTypes.func.isRequired,
  listLength: PropTypes.number.isRequired,
};

export default NavBar;
