const Search = ({
  onSearch,
  query,
  placeholder,
}: {
  onSearch: (e: any) => void;
  query: string;
  placeholder: string | undefined;
}) => {
  return (
    <input
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      value={query}
      type="search"
      placeholder={placeholder}
      className=" p-2 pl-4 rounded-lg w-[400px]  max-w-xl  focus:outline-none border-1"
      onChange={onSearch}
    />
  );
};

export default Search;
