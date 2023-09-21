import "./App.css";
import CharecterDetailes from "./components/CharecterDetailes";
import CharecterList from "./components/CharecterList";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navbar";
import { allCharacters } from "../data/data";
import { useEffect, useState } from "react";
//* install toaster npm from react-hot-toast
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  // static data (save in data folder)
  // const [characters, setcharacters] = useState(allCharacters);

  // dynamic data with fetch api
  const [characters, setcharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [count, setCount] = useState(0);

  // argument of useEffect did not get "async"=> infinity loop
  useEffect(() => {
    //# FetchData
    //* fetch data then/catch ⬇
    // setIsLoading(true);
    // fetch("https://rickandmortyapi.com/api/character")
    // .then((res) =>
    // {if(!res.ok) throw new Error("sth went wrong");
    // return  res.json();
    // })
    // .then((data) =>
    //  {setcharacters(data.results);
    // // setIsLoading(false);
    //  })
    // );

    // .catch((error) => {
    // //  setIsLoading(false);
    //   toast.error(error.message)
    // })
    // .finally(()=>(setIsLoading(false);))
    //* fetch data async/await ⬇
    // async function fetchData() {
    //   try {
    //     setIsLoading(true);
    //     const res = await fetch("https://rickandmortyapi.com/api/character");
    //     if (!res.ok) throw new Error("sth went wrong");
    //     const data = await res.json();
    //     setcharacters(data.results);
    //     // setIsLoading(false);
    //   } catch (error) {
    //     // setIsLoading(false);
    //     // console.log(error.massage);
    //     // for real project we use :error.response.data.message //we get all error from backend
    //     toast.error(error.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // fetchData();

    //#AxiosData
    //* axios then/catch
    // setIsLoading(true);
    // axios
    //   .get("https://rickandmortyapi.com/api/character")
    //   .then((res) => {
    //     setcharacters(res.data.results);
    //   })
    //   .catch((error) => {
    //     toast.error(error.response.data.error);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
    //*axios async/await

    async function axiosData() {
      try {
        const { data } = await axios.get("https://rickandmortyapi.com/api/character");
        setcharacters(data.results);
      } catch (error) {
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    axiosData();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    async function SearchData() {
      try {
        const { data } = await axios.get(`https://rickandmortyapi.com/api/character?name=${query}`, { signal });
        setcharacters(data.results);
      } catch (error) {
        // fetch=>error.name==="AbortError"
        // axios => axios.isCancel(catch argoman (in this example is error))
        if (axios.isCancel(error)) {
          console.log(error.message);
        } else {
          setcharacters([]);
          toast.error(error.response.data.error);
        }
      } finally {
        setIsLoading(false);
      }
    }
    SearchData();
    // clean up function
    return () => {
      // acsses to controler
      controller.abort();
    };
  }, [query]);

  // cleanup function example
  // useEffect(() => {
  //   const interval = setInterval(() => setCount((c) => c + 1), 1000);
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [count]);
  // 🔼then its out of control

  const handleSelectCharechter = (id) => {
    setSelectedId(id);
  };
  const addToMyFavourites = favourites.map((item) => item.id).includes(selectedId);
  const handleAddFavourite = (char) => {
    setFavourites((prevfave) => [...prevfave, char]);
  };
  return (
    <div className="app">
      <div style={{ color: "white" }}>{count}</div>
      {/* add toastert where all of our componet are */}
      <Toaster />
      <Navbar>
        <Search setQuery={setQuery} query={query} />
        <SearchResult numOfResult={characters.length} />
        <Favourites numOfFaivourite={favourites.length} />
      </Navbar>
      <div className="main">
        <CharecterList characters={characters} isLoading={isLoading} onSelectCharechter={handleSelectCharechter} selectedId={selectedId} />
        <CharecterDetailes selectedId={selectedId} onAddFavourite={handleAddFavourite} addToMyFavourites={addToMyFavourites} />
      </div>
    </div>
  );
}
export default App;
