import { useParams } from "react-router";
import LineChartGraph from "./LineChartGraph";
import { useState } from "react";
import { useEffectOnce } from "../libs/hook";
import { CryptoChartData, CryptoCurrencyData } from "../libs/types";
import { getCryptocurrencyData, getCryptoGraphData } from "../libs/services";

const CrpyptoDashboard = () => {
  const { cryptocurrency } = useParams();
  const [cryptoGraphData, setCryptoGraphData] = useState({});
  const [crpytocurrencyData, setCrpytocurrencyData] = useState({});
  const [basicCryptoInfo, setBasicCryptoInfo] = useState({});

  useEffectOnce(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [data1, data2] = await Promise.all([
          getCryptoGraphData(cryptocurrency as string),
          getCryptocurrencyData(cryptocurrency as string),
        ]);
        setCryptoGraphData(data1);
        setCrpytocurrencyData(data2);
        setBasicCryptoInfo({
          name: data2.name,
          image: data2.image,
          symbol: data2.symbol,
          market_cap_rank: data2.market_cap_rank,
          localization: data2.localization,
          sentiment_votes_up_percentage: data2.sentiment_votes_up_percentage,
          sentiment_votes_down_percentage:
            data2.sentiment_votes_down_percentage,
          community_data: data2.community_data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return (
    <div className="grid grid-cols-5 gap-2">
      <CryptoCurrencyInfo data={crpytocurrencyData as CryptoCurrencyData} />
      <CryptoMetrics metaData={basicCryptoInfo as CryptoCurrencyData} />
      <CrpytoLineChart
        data={cryptoGraphData as CryptoChartData}
        metaData={basicCryptoInfo}
      />
    </div>
  );
};

export const CryptoCurrencyInfo = ({ data }: { data: CryptoCurrencyData }) => {
  const {
    links,
    contract_address,
    watchlist_portfolio_users,
    last_updated,
    genesis_date,
    localization,
    symbol,
  } = data;
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      className="col-span-4  p-5 mt-2 shadow rounded-lg border-1 max-h-fit "
    >
      {localization && (
        <label className="font-semibold" htmlFor="description">{`${
          localization[`en`]
        } (${symbol.toLocaleUpperCase()}) |  Genesis Date : ${new Date(
          genesis_date
        ).toDateString()}`}</label>
      )}
      <p id="description" className="flex flex-col gap-2 mt-2">
        {links && links[`homepage`] && (
          <span className="font-medium">
            <label htmlFor="homepage">Website : </label>
            <a
              target="_blank"
              id="homepage"
              href={links[`homepage`]}
              className="hover:underline"
            >
              {links[`homepage`]}
            </a>
          </span>
        )}
        {links && links[`whitepaper`] && (
          <span className="font-medium">
            <label htmlFor="whitepaper">Whitepaper : </label>
            <a
              target="_blank"
              id="whitepaper"
              href={links[`whitepaper`]}
              className="hover:underline"
            >
              {links[`whitepaper`]}
            </a>
          </span>
        )}
        {contract_address && (
          <span className="font-medium">
            <label htmlFor="contract-address">Contract address : </label>
            <span id="contract-address">{contract_address}</span>
          </span>
        )}
        {watchlist_portfolio_users && (
          <span className="font-medium">
            <label htmlFor="watchlist_portfolio_users">
              WatchList portfolio users :{" "}
            </label>
            <span id="watchlist_portfolio_users">
              {watchlist_portfolio_users}
            </span>
          </span>
        )}
        {last_updated && (
          <span className="font-medium">
            <label htmlFor="last_updated">Last updated at : </label>
            <span id="last_updated">
              {new Date(last_updated).toUTCString()}
            </span>
          </span>
        )}
      </p>
    </div>
  );
};
export const CryptoMetrics = ({ metaData }: any) => {
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      className="col-span-1 p-5 mt-2 shadow rounded-lg border-1 max-h-fit "
    >
      <div className="flex flex-col text-center">
        <span className="text-2xl">Rank #{metaData.market_cap_rank}</span>
        <hr className="mt-2 mb-2 opacity-20" />
        <label htmlFor="user_votes">Users voting</label>
        <div
          id="user_votes"
          className="flex text-center justify-center items-center"
        >
          {Math.round(metaData?.sentiment_votes_up_percentage) !== 0 ? (
            <span className="pt-2 pb-2 text-xl flex items-center ">
              {metaData?.sentiment_votes_up_percentage?.toFixed(2)}{" "}
              <span className="ml-2 text-green-500 text-3xl">&#8593;</span>
            </span>
          ) : null}
          {Math.round(metaData?.sentiment_votes_up_percentage) === 0 ||
          Math.round(metaData?.sentiment_votes_down_percentage) === 0 ? null : (
            <hr className=" mt-6 mb-2 opacity-20 rotate-90 w-10" />
          )}
          {Math.round(metaData?.sentiment_votes_down_percentage) !== 0 ? (
            <span className="pt-2 pb-2 text-xl flex items-center ">
              {metaData?.sentiment_votes_down_percentage?.toFixed(2)}
              <span className="ml-2 text-red-500 text-3xl">&#8595;</span>
            </span>
          ) : null}
        </div>
        {metaData.community_data ? (
          <>
            <hr className="mt-2 mb-2 opacity-20" />
            <label htmlFor="twitter_followers">Followers</label>
            <span id="twitter_followers" className="text-2xl">
              {metaData.community_data[`twitter_followers`]}
            </span>
          </>
        ) : null}
      </div>
    </div>
  );
};
export const CrpytoLineChart = ({
  data,
  metaData,
}: {
  data: CryptoChartData;
  metaData: any;
}) => {
  const { prices, market_caps, total_volumes } = data;

  const priceChartData = prices?.map((v: any) => {
    return {
      date: new Date(v[0]),
      dp: Number(v[1] / 1e6),
    };
  });

  const marketCapsData = market_caps?.map((v: any) => {
    return {
      date: new Date(v[0]),
      dp: Number(v[1] / 1e6),
    };
  });

  const totalVolumesData = total_volumes?.map((v: any) => {
    return {
      date: new Date(v[0]),
      dp: Number(v[1] / 1e6),
    };
  });

  const toolTipFormatter = (value: any) => `${value.toFixed(2)}`;

  const labels = ["Price", "Market cap", "Total volume"];

  const graphData = {
    priceChartData,
    marketCapsData,
    totalVolumesData,
    labels,
  };
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      className="col-span-5  p-5 mt-2 shadow rounded-lg border-1 max-h-fit"
    >
      {metaData && (
        <label htmlFor="lineChartGraph" className="flex mb-4">
          {metaData.image && (
            <img
              className=""
              src={metaData.image[`thumb`]}
              alt={`${metaData.name} image`}
            />
          )}
          {metaData.localization && (
            <span className="pl-1">
              {metaData.localization[`en`]} (
              {metaData.symbol.toLocaleUpperCase()})
            </span>
          )}
        </label>
      )}
      <LineChartGraph data={graphData} toolTipFormatter={toolTipFormatter} />
    </div>
  );
};

export default CrpyptoDashboard;
