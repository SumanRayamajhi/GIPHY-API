import React from "react";

function SearchTerm({ searchHandler, search }) {
  return (
    <div className="w-25">
      <form className="form-inline d-flex justify-content-center m-2">
        <input
          className="form-control"
          type="text"
          placeholder="search"
          value={search}
          onChange={searchHandler}
        />
        <button
          type="submit"
          className="btn btn-primary mx-2"
          onClick={(event) => event.preventDefault()}
        >
          Go
        </button>
      </form>
    </div>
  );
}

export default SearchTerm;
