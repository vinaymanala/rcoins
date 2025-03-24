const Search = ({
  onSearch,
  query,
}: {
  onSearch: (e: any) => void;
  query: string;
  isLoading: boolean;
}) => {
  return (
    <input
      value={query}
      type="search"
      placeholder="Search crypto coins Ex. Bitcoin"
      className="bg-stone-200 p-2 pl-4 rounded-lg w-[400px]  max-w-xl  focus:outline-none"
      onChange={onSearch}
    />
  );
};

export default Search;
