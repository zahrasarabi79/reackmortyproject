import React, { Children, useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import rickSvg from "../assets/img/icons8-rick-sanchez.svg";
import Modal from "./Modal";
import { Charecter } from "./CharecterList";

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
  return <input value={query} type="text" className="text-field" onChange={(e) => setQuery(e.target.value)} placeholder="search..." />;
}
export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">found {numOfResult} Charecter</div>;
}
export function Favourites({ Faivourite, onDeleteFaivourite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title="Faivourite list" onOpen={setIsOpen} open={isOpen}>
        {Faivourite.map((item) => (
          <Charecter key={item.id} item={item}>
            <button className="icon red" onClick={() => onDeleteFaivourite(item.id)}>
              <TrashIcon />
            </button>
          </Charecter>
        ))}
      </Modal>
      <button onClick={() => setIsOpen((is) => !is)} className="heart">
        <HeartIcon className="icon" />
        <span className="badge">{Faivourite.length}</span>
      </button>
    </>
  );
}

export default Navbar;
