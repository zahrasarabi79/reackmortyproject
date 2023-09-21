import React from "react";
import maleSvg from "../assets/img/icons8-jerry-smith.svg";
import femaleSvg from "../assets/img/icons8-summer-smith.svg";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Loading from "./Loading";
function CharecterList({
  characters,
  isLoading,
  onSelectCharechter,
  selectedId,
}) {
  return (
    <div className="characters-list">
      {isLoading ? (
        <Loading />
      ) : (
        characters.map((item) => (
          <Charecter
            key={item.id}
            item={item}
            onSelectCharechter={onSelectCharechter}
            selectedId={selectedId}
          />
        ))
      )}
    </div>
  );
}

function Charecter({ item, onSelectCharechter, selectedId }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <h3 className="name">
        <span>{item.gender === "Male" ? "🧒" : "👩"}</span>
        <span>{item.name}</span>
      </h3>
      <div className="list-item__info info">
        <span
          className={`status ${item.status === "Dead" ? "red" : ""}`}
        ></span>
        <span> {item.status} </span>
        <span> - {item.species}</span>
      </div>
      <button className="red icon" onClick={() => onSelectCharechter(item.id)}>
        {selectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}
export default CharecterList;
