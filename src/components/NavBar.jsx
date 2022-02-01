import React from "react";

function NavBar(props) {
  const { onAddList } = props;

  const addListButton = (
    <button
      type="button"
      className="btn btn-lg btn-outline-primary d-flex"
      onClick={onAddList}
    >
      New List
    </button>
  );

  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid px-4">
        <div className="text-white">
          <h1>Todo List App</h1>
          <h6 className="text-white">by Charles O'Hanlon</h6>
        </div>
        {addListButton}
      </div>
    </nav>
  );
}

export default NavBar;
