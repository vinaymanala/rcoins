import { useNavigate } from "react-router";
import Search from "./Search";
import { useState } from "react";
import { useDebounce, useEffectOnce } from "../libs/hook";
import { getSearchQueryResult } from "../libs/services";
import { useTheme } from "./providers/ThemeProvider";
import { LuMoon, LuSun } from "react-icons/lu";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchedItems, setSearchedItems] = useState({});

  const { theme, setTheme } = useTheme();
  useEffectOnce(() => setQuery(""));

  const fetchCoins = async () => {
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
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
          color: "var(--color-fg)",
        }}
        className={`absolute mt-1 p-2 flex flex-col text-left w-full max-h-[40vh] z-10 overflow-y-scroll border-1  rounded-lg `}
      >
        <ul className="text-md ">
          {isLoading ? (
            <p>{"Loading..."}</p>
          ) : coins.length ? (
            coins.map((coin: any) => (
              <li
                onClick={() => handleRedirect(coin.api_symbol)}
                className="flex p-2 gap-1 items-center cursor-pointer hover-label"
              >
                {/* <img src={coin.thumb} alt={`${coin.api_symbol} logo`} /> */}
                <p>{`${coin.name}(${coin.symbol})`}</p>
              </li>
            ))
          ) : (
            <p className="opacity-80 text-center">{"No results found"}</p>
          )}
        </ul>
      </div>
    );
  };
  const buttonLabel = `Change to ${theme === "dark" ? "light" : "dark"} theme`;
  return (
    <nav
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      className=" p-2 rounded-lg flex justify-between items-center "
    >
      <button
        className="text-xl ml-1 font-stretch-75% font-semibold cursor-pointer"
        onClick={() => navigate("/")}
      >
        rcoins
      </button>
      <div className="relative">
        <Search
          onSearch={handleSearch}
          query={query}
          placeholder={"Search crypto coins Ex. Bitcoin"}
        />
        <SearchedItems data={searchedItems as {}} />
      </div>
      <button
        aria-label={buttonLabel}
        type="button"
        title={buttonLabel}
        onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark");
        }}
      >
        {theme === "dark" ? (
          <LuSun className="text-2xl cursor-pointer mr-5" />
        ) : (
          <LuMoon className="text-2xl cursor-pointer mr-5 " />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
