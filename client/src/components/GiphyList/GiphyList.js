import React, { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";
import SearchTerm from "../SearchTerm/SearchTerm";
import Pagination from "../Pagination/Pagination";
import "./GiphyList.css";

function GiphyList() {
  const [gifs, setGifs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(15);

  const APIKEY = "2Ur3qJCzPzDjmKq1SfZP549LqfljsHLZ";

  const getGiphyRequest = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      let url = `http://api.giphy.com/v1/gifs/trending?api_key=${APIKEY}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      setGifs(responseJson.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    getGiphyRequest();
  }, []);

  const searchHandler = async (event) => {
    setSearch(event.target.value);
    setIsError(false);
    setIsLoading(true);
    try {
      const url = `http://api.giphy.com/v1/gifs/search?q=${search}&api_key=${APIKEY}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      console.log(responseJson);
      setGifs(responseJson.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
    setIsLoading(false);
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = gifs.slice(indexOfFirstPost, indexOfLastPost);

  const renderGifs = () => {
    if (isLoading) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    return currentPosts.map((el) => {
      return (
        <div className="Giphy-image" key={el.id}>
          <img src={el.images.fixed_height.url} alt="url-images" />
        </div>
      );
    });
  };

  const renderErrors = () => {
    if (isError) {
      return (
        <div>
          <Error />
        </div>
      );
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="Giphy-container">
      <nav className="d-flex justify-content-between align-items-center">
        <img src="/giphy-logo.gif" alt="logo" className="w-25 h-50 ms-1"></img>
        <SearchTerm searchHandler={searchHandler} search={search} />
        <Pagination
          postPerPage={postPerPage}
          totalPosts={gifs.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </nav>

      {renderErrors()}
      <div className="Giphy-container">{renderGifs()}</div>
    </div>
  );
}

export default GiphyList;
