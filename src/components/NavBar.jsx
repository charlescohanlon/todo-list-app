import React from 'react';
import PropTypes from 'prop-types';

function NavBar(props) {
  const { onAddList } = props;
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid px-4">
        <h1 className="text-white">Todo List App</h1>
        <button type="button" className="btn btn-lg btn-outline-primary d-flex" onClick={onAddList}><b>New List</b></button>
      </div>
    </nav>
  );
}
NavBar.propTypes = {
  onAddList: PropTypes.func.isRequired,
};

export default NavBar;
