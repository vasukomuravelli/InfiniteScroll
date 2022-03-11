import React from "react";
import { TailSpin } from 'react-loader-spinner';

export const Products = () => {
  const [data, setData] = React.useState([]);
  const [page, setPage] = React.useState(1);
const [loading, setLoading] = React.useState(false);
const [query, setQuery] = React.useState("random");
  const divRef = React.useRef();
  React.useEffect(() => {setData([])},[query])
  React.useEffect(() => {
    setLoading(true);
    getData();
  }, [query,page]);
  function getData() {
    fetch(
      `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=25`,
      {
        method: "GET",
        headers: {
          Authorization:
            "563492ad6f9170000100000180a152de2b3a48579c71ec5794cc6bb7"
        }
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setData([...data, ...response.photos]);
        setLoading(false);
      });
  }
  const scroll = () => {
    if (
      divRef.current.scrollTop + divRef.current.clientHeight >
      divRef.current.scrollHeight - 5
    ) {
      setPage((page) => page + 1);
      console.log(page);
    }
  };
    const debounce = (fn,timer) => {
        let delay;
        return () => {
            if (delay) clearTimeout(delay);
            delay = setTimeout(() =>fn(),timer)
        }
    }
    const handleSearch = () => {
        setQuery(document.getElementById("searchbar").value);
    }
  return (
    <div className="container">
          <div className="heading">
              <h1> Products page</h1>
              <div className="search">
                <input type="text" placeholder="Search favourites" id="searchbar" onChange={debounce(handleSearch,2000)}/>
              </div>
          </div>      
      <div className="productsGallery" ref={divRef} onScroll={scroll} style={{filter:loading?"blur(3px)":"blur(0)"}}>
        {data.map((item) => {
          return (
            <div className="prodDiv" key={item.src.large2x}>
              <img src={item.src.large2x} alt={item.src.large2x} />
            </div>
          );
        })}
      </div>
      {loading ? (<div className="loader"><TailSpin color="#C65D7B"/></div> ) : null}
    </div>
  );
};
