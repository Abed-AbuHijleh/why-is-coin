import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import Pagination from "./Pagination";
import "./styling/BodyHome.css";

const BodyHome = ({ changePage, displayPortrait }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(100);
  const [totalPosts, updateTotalPosts] = useState(0);

  useEffect(() => {
    fetchPosts(
      (currentPage - 1) * postsPerPage + 1,
      currentPage * postsPerPage
    );
    // eslint-disable-next-line
  }, []);

  // function to handle success
  function apiSuccess() {
    try {
      setLoading(false);
      setPosts(JSON.parse(this.responseText).data);
      updateTotalPosts(
        parseInt(JSON.parse(this.responseText).status.total_count)
      );
    } catch (e) {
      console.log(this);
    }
  }

  const fetchPosts = async (start, end) => {
    setLoading(true);
    let res = await new XMLHttpRequest();
    res.onload = apiSuccess;
    res.onerror = console.log();
    res.open(
      "GET",
      "http://localhost:8000/data/latest?start=" + start + "&end=" + end
    );
    res.send();
  };

  // Change page
  const paginate = pageNumber => {
    if (isNaN(parseInt(pageNumber))) {
      if (pageNumber === "<") {
        if (currentPage !== 1) {
          setCurentPage(currentPage - 1);
          fetchPosts(
            postsPerPage * currentPage + 1,
            postsPerPage * (currentPage + 1) > totalPosts
              ? totalPosts
              : postsPerPage * (currentPage + 1)
          );
        } else {
          // Do nothing
        }
      } else if (pageNumber === ">") {
        if (currentPage !== Math.ceil(totalPosts / postsPerPage)) {
          setCurentPage(currentPage + 1);
          fetchPosts(
            postsPerPage * currentPage + 1,
            postsPerPage * (currentPage + 1) > totalPosts
              ? totalPosts
              : postsPerPage * (currentPage + 1)
          );
        } else {
          // Do nothing
        }
      } else {
        // Do nothing
      }
    } else {
      setCurentPage(parseInt(pageNumber));
      fetchPosts(
        postsPerPage * (pageNumber - 1) + 1,
        postsPerPage * pageNumber > totalPosts
          ? totalPosts
          : postsPerPage * pageNumber
      );
    }
  };

  const switchToTokenPage = ticker => {
    changePage("BodyTicker", ticker);
  };

  const userResultCount =
    "Showing Results " +
    (postsPerPage * (currentPage - 1) + 1) +
    " - " +
    (postsPerPage * currentPage > totalPosts
      ? totalPosts
      : postsPerPage * currentPage) +
    " out of " +
    totalPosts;

  // Set page size dropdown JS

  window.onload = function () {
    function toggleClass(elem, className) {
      if (elem.className.indexOf(className) !== -1) {
        elem.className = elem.className.replace(className, "");
      } else {
        elem.className = elem.className.replace(/\s+/g, " ") + "" + className;
      }
      return elem;
    }

    function toggleMenuDisplay(e) {
      const dropdown = e.currentTarget.parentNode;
      const menu = dropdown.querySelector(".menu");
      toggleClass(menu, "hide");
    }

    function handleOptionSelected(e) {
      toggleClass(e.target.parentNode, "hide");
      document.querySelector(".dropdown .title").textContent =
        e.target.textContent + "";
      document
        .querySelector(".dropdown .title")
        .dispatchEvent(new Event("change"));
      setPostsPerPage(parseInt(e.target.textContent + ""));
      setCurentPage(1);
      fetchPosts(1, parseInt(e.target.textContent + ""));
    }

    // Toggle title
    document
      .querySelector(".dropdown .title")
      .addEventListener("click", toggleMenuDisplay);
    // Option selected
    document
      .querySelectorAll(".dropdown .option")
      .forEach(option =>
        option.addEventListener("click", handleOptionSelected)
      );
  };

  return (
    <div className="body-home-div">
      <table className="home-table">
        <thead>
          <tr className="table-header-row">
            <th className="rank">#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h%</th>
            <th>24h%</th>
            <th>7d%</th>
            <th>Circulating Supply</th>
            <th>7 Day Graph</th>
          </tr>
        </thead>
        <Posts
          posts={posts}
          loading={loading}
          openSidePage={switchToTokenPage}
        />
      </table>
      <div className="home-footer-div">
        <ul className="main-footer">
          <li className="main-footer-elem">
            <h5 className="userResultCount">{userResultCount}</h5>
          </li>
          <li className="main-footer-elem" id="pagination-li">
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={totalPosts}
              paginate={paginate}
              currentPage={currentPage}
            />
          </li>
          <li className="main-footer-elem" id="dropdown-li">
            <div className="row-heading-title">Rows per Page</div>
            <div className="dropdown">
              <div className="title pointerCursor">
                100
                <i className="fa fa-angle-right" />
              </div>
              <div className="menu pointerCursor hide">
                <div className="option" id="option1">
                  20
                </div>
                <div className="option" id="option2">
                  50
                </div>
                <div className="option" id="option3">
                  100
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BodyHome;
