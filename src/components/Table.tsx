import { useNavigate } from "react-router";
import { TableProps } from "../libs/types";
import "../index.css";
const Table = ({ data, columns }: TableProps) => {
  const navigate = useNavigate();
  const handleRedirectLink = (id: string) => {
    navigate(`/${id.toLocaleLowerCase()}`);
  };

  const TableRow = ({
    v,
    className,
    children,
  }: {
    v?: [string, { [k: string]: string | number | null }];
    className: string;
    children: React.ReactNode;
  }) => {
    return (
      <tr key={v ? v[1].id : undefined} className={className}>
        {children}
      </tr>
    );
  };

  const renderColumnValues = (value: number) => {
    const formattedValue =
      value && Math.round(value / 1e6) > 99
        ? Math.round(value / 1e6)
        : Math.round(value / 1e6) <= 9
        ? (value / 1e6).toFixed(2)
        : Math.round(value / 1e6) <= 99
        ? (value / 1e6).toFixed(1)
        : Math.round(value / 1e6);
    return formattedValue.toLocaleString();
  };

  const TableRowData = ({
    id,
    accessor,
    v,
  }: {
    id: string;
    accessor: string;
    v?: [string, { [k: string]: string | number | null }];
  }) => {
    return (
      <td
        key={id}
        id={id as string}
        className={`  p-4 ${accessor === "name" ? "cursor-pointer" : ""} `}
        onClick={() => accessor === "name" && handleRedirectLink(id)}
      >
        {v && (
          <p key={id} className="relative" data-tooltip={v && v[1][accessor]}>
            {" "}
            {accessor === "market_cap"
              ? renderColumnValues(v[1][accessor] as number)
              : v[1][accessor as string]}
          </p>
        )}
      </td>
    );
  };
  return (
    <table className="table-auto text-left  w-full">
      <caption className="table-caption text-lg text-center font-medium">
        Top 10 Cryptocurrencies
      </caption>
      <thead>
        <TableRow className={"border-b border-stone-200"}>
          <>
            {columns.map(({ name }) => (
              <th key={name} className="p-4">
                <p key={name} className="text-sm font-bold leading-none">
                  {name}
                </p>
              </th>
            ))}
          </>
        </TableRow>
      </thead>
      <tbody>
        {Object.entries(data).map((v, i) => {
          const id = v[1].id as string;
          return (
            <TableRow v={v} className={"hover-label"}>
              {columns.map(({ accessor }) => (
                <TableRowData id={id} accessor={accessor} v={v} />
              ))}
            </TableRow>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
