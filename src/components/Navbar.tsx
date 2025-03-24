import { useNavigate } from "react-router";
import Search from "./Search";
import { useState } from "react";
import { useDebounce, useEffectOnce } from "../libs/hook";
import { getSearchQueryResult } from "../libs/services";

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchedItems, setSearchedItems] = useState({});

  useEffectOnce(() => setQuery(""));

  const fetchCoins = async () => {
    console.log({ query });
    try {
      const data = await getSearchQueryResult(query);
      setSearchedItems(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const debouncedFunc = useDebounce(fetchCoins, 500);

  const handleSearch = (e: any) => {
    const q = e.target.value as string;
    setQuery(q);
    if (q.length > 3) {
      setIsLoading(true);
      debouncedFunc();
    } else {
      setIsLoading(false);
      setSearchedItems({});
    }
  };

  const SearchedItems = ({ data }: { data: {} }) => {
    const { coins }: any = data;

    const handleRedirect = (coin: any) => {
      setQuery("");
      setSearchedItems({});
      if (location.pathname !== "/") {
        window.location.href = `/${coin.toLocaleLowerCase()}`;
      } else {
        navigate(`/${coin.toLocaleLowerCase()}`);
      }
    };

    if (!Object.keys(data).length) {
      return null;
    }
    return (
      <div
        className={`absolute mt-1 p-2 flex flex-col text-left w-full h-[40vh] z-10 overflow-y-scroll border-1 border-stone-200 rounded-lg  bg-stone-50`}
      >
        <ul className="text-md ">
          {coins.map((coin: any) => (
            <li
              onClick={() => handleRedirect(coin.api_symbol)}
              className="flex p-2 gap-1 items-center cursor-pointer hover:bg-gray-200"
            >
              <img src={coin.thumb} alt={`${coin.api_symbol} logo`} />
              <p>{`${coin.name}(${coin.symbol})`}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <nav className=" p-2 rounded-lg flex justify-between items-center bg-stone-100">
      <button
        className="text-xl ml-1 font-stretch-75% font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        rcoins
      </button>
      <div className="relative">
        <Search onSearch={handleSearch} query={query} />
        <SearchedItems data={searchedItems as {}} />
      </div>
      <button>Toggle Theme</button>
    </nav>
  );
};

export default Navbar;
