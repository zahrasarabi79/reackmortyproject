import React, { Children } from "react";
import { HeartIcon } from "@heroicons/react/24/outline";
import rickSvg from "../assets/img/icons8-rick-sanchez.svg";

function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="navbar__logo">
      <img src={rickSvg} alt="Your SVG" />
    </div>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      type="text"
      className="text-field"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="search..."
    />
  );
}
export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">found {numOfResult} Charecter</div>;
}
export function Favourites({ numOfFaivourite }) {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">{numOfFaivourite}</span>
    </button>
  );
}

export default Navbar;
