import React, { useEffect, useState } from "react";
import { episodes } from "../../data/data";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "./Loading";

function CharecterDetailes({ selectedId, onAddFavourite, addToMyFavourites }) {
  const [charecter, setCharecter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  useEffect(() => {
    async function CharecterDataAxios() {
      try {
        setIsLoading(true);
        setCharecter(null);
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
        const episodeId = data.episode.map((episode) => episode.split("/").at(-1));
        const { data: episodeData } = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);
        setCharecter(data);
        setEpisodes([episodeData].flat());
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) CharecterDataAxios();
  }, [selectedId]);
  if (isLoading)
    return (
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "var(--slate-700)",
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          color: "white",
        }}
      >
        is Loading . . .
      </div>
    );

  if (!selectedId)
    return (
      <div
        style={{
          width: "100%",
          height: "100px",
          backgroundColor: "var(--slate-700)",
          borderRadius: 8,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 20,
          color: "white",
        }}
      >
        Select your character
      </div>
    );
  return (
    <div style={{ flex: 1 }}>
      <CharectorSubInfo charecter={charecter} addToMyFavourites={addToMyFavourites} onAddFavourite={onAddFavourite} />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharecterDetailes;
const CharectorSubInfo = ({ charecter, onAddFavourite, addToMyFavourites }) => {
  return (
    <div className="character-detail">
      <img className="character-detail__img" src={charecter?.image} alt={charecter?.name} />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{charecter?.gender === "Male" ? "👦" : "👩"}</span>
          <span>&nbsp;{charecter?.name}</span>
        </h3>
        <div className="info">
          <span className={`status ${charecter?.status === "Dead" ? "red" : ""}`}></span>
          <span> {charecter?.status} </span>
          <span> - {charecter?.species}</span>
        </div>
        <div className="location">
          <p>Last Known Location: </p>
          <p>{charecter?.location.name}</p>
        </div>
        <div className="actions">
          {addToMyFavourites ? (
            <p>charecter is your Favourites charecter✅</p>
          ) : (
            <button onClick={() => onAddFavourite(charecter)} className="btn btn--primary">
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const EpisodeList = ({ episodes }) => {
  // true =>earliest =>acse
  const [sortBy, setSortBy] = useState(true);
  let sortedEpisode;
  if (sortBy) {
    sortedEpisode = [...episodes].sort((a, b) => new Date(a.created) - new Date(b.created));
  } else {
    sortedEpisode = [...episodes].sort((a, b) => new Date(b.created) - new Date(a.created));
  }
  return (
    <div className="character-episodes">
      <div className="title">
        <h2>List of Episode:</h2>
        <button onClick={() => setSortBy((is) => !is)}>
          <ArrowUpCircleIcon className="icon" style={{ rotate: sortBy ? "0deg" : "180deg" }} />
        </button>
      </div>
      <ul>
        {sortedEpisode.map((item, index) => (
          <li key={item.id}>
            <div>
              {String(index + 1).padStart(2, "0")}. {item.episode}: <strong>{item.name}</strong>
            </div>
            <div className="badge badge--secondary">{item.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
