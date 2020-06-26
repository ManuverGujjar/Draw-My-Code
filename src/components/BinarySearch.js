import React, { useState, useEffect, useContext } from "react";
import "../styles/LinearSearch.css";
import { ArrayContext } from "./SearchAlgos";

const BinarySearch = () => {
  // Global Array elements and search value
  const ArrData = useContext(ArrayContext);

  // Array box colors
  const colors = {
    boxFound: "greenyellow",
    boxDefault: "white",
    boxMid: "orange",
    boxSelected: "yellow",
  };

  const searchElement = parseInt(ArrData.Search);

  // current state of linear
  const [searching, setSearching] = useState(false);

  // HTML divs of array divs
  const [component, setComponent] = useState([]);

  // Pointer for the index of aray

  // Stores index of elements found
  const [found, setFound] = useState(-1);
  const [msg, setMsg] = useState("");
  const [showInfo, setShowInfo] = useState(true);

  // Window for rendering annimation color
  const [win, setWin] = useState({ l: -1, m: -1, r: -1 });

  useEffect(() => {
    if (searching) setMsg(`Searching for ${searchElement}`);
    else setMsg(`Search for ${searchElement}`);
    const newArray = ArrData.Array;
    const Array = newArray.map((e, index) => (
      <div
        className="arr-box"
        key={index}
        style={{ backgroundColor: setColor(index, win) }}
      >
        <p>{e}</p>
      </div>
    ));

    setComponent(Array);
  }, [ArrData.Array, searching, searchElement, win, found]);

  // Returns color for a particular array ind
  const setColor = (index, { l, m, r }) => {
    if (index === found) {
      return colors.boxFound;
    }
    if (index === m) return colors.boxMid;
    if (index >= l && index <= r) return colors.boxSelected;
    return colors.boxDefault;
  };

  // Start binary search annimation
  const binSearch = () => {
    if (searching) return;

    setSearching(true);
    setMsg(`Searching for ${ArrData.Search}`);
    let arr = ArrData.Array;
    // format arr
    arr = arr.map((e) => parseInt(e, 10));
    const search = parseInt(ArrData.Search, 10);

    let start = 0;
    let end = arr.length - 1;
    let mid;
    setWin({ ...win, l: start, r: end });
    let binSearch = setInterval(() => {
      if (start > end) {
        setFound(-1);
        setMsg(`Element not found in the array. . .`);
        clearInterval(binSearch);
      }
      // console.table(win);
      mid = parseInt((start + end) / 2, 10);
      setWin({ ...win, l: start, m: mid, r: end });

      if (search === arr[mid]) {
        setFound(mid);
        setMsg(`Element found at index: ${mid}`);
        clearInterval(binSearch);
        return;
      } else if (search > arr[mid]) {
        // setWin({ ...win, l: start });

        start = mid + 1;
      } else if (search < arr[mid]) {
        end = mid - 1;
        // setWin({ ...win, r: end });
      }
    }, 1000);
    setSearching(false);
    setFound(-1);
  };

  const infoDiv =
    window.innerWidth < 1000 ? null : (
      <div className="info">
        <h2 className="heading" style={{ textAlign: "center" }}>
          Info.
        </h2>
        <p>
          Binary search is a fast search algorithm with run-time complexity of
          Ο(log n). This search algorithm works on the principle of divide and
          conquer. For this algorithm to work properly, the data collection
          should be in the sorted form. <br />
        </p>
        <b>Steps:</b>
        <ol>
          <li> Compare x with the middle element. </li>
          <li> If x matches with middle element, we return the mid index.</li>
          <li>
            {" "}
            Else If x is greater than the mid element, then x can only lie in
            right half subarray after the mid element. So we recur for right
            half.
          </li>
          <li>Else (x is smaller) recur for the left half.</li>
        </ol>
        <small style={{ textAlign: "right", textDecoration: "none" }}>
          <a
            href="https://www.geeksforgeeks.org/binary-search/"
            target="__blank"
          >
            Read more . .
          </a>
        </small>
      </div>
    );

  return (
    <div className="linear-search">
      <h2 className="heading">Binary Search</h2>

      <h5 className="sub-heading"> {msg}</h5>

      <div className="array">{component} </div>
      <br />
      <div className="btn-group">
        {/* <label className="sub-heading"> {msg} </label> */}
        <button id="search-btn" className="button" onClick={binSearch}>
          Search
        </button>
      </div>
      <br />
      {infoDiv}
    </div>
  );
};

export default BinarySearch;
