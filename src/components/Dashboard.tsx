import { useState, lazy, Suspense } from "react";
import {
  GlobalMarketData,
  PortfolioAllocationDistribution,
  StackedBarChartGraphData,
  Top10MarketCapData,
} from "../libs/types";
import Table from "./Table";
import { useEffectOnce } from "../libs/hook";
const RadarChartGraph = lazy(() => import("./RadarChartGraph"));
const StackedBarChart = lazy(() => import("./StackedBarChart"));
const PieChartGraph = lazy(() => import("./PieChartGraph"));

import { getGlobalMarketData, getTop10MarketCap } from "../libs/services";
import Loader from "./Loader";

const Dashboard: React.FC = () => {
  const [top10MarketCap, setTop10MarketCap] = useState<Top10MarketCapData | []>(
    []
  );
  const [globalMarketData, setGlobalMarketData] = useState<
    GlobalMarketData | {}
  >({});

  useEffectOnce(() => {
    const fetchData = async () => {
      const [data1, data2] = await Promise.all([
        getTop10MarketCap(),
        getGlobalMarketData(),
      ]);
      setTop10MarketCap(data1);
      setGlobalMarketData(data2.data);
    };
    fetchData();
  });

  return (
    <main className="grid grid-cols-3 gap-4 mx-2">
      <PortfolioAllocationChart data={top10MarketCap as Top10MarketCapData} />
      <MarketShareTrends data={globalMarketData as GlobalMarketData} />
      <CryptoVolumeTrends data={globalMarketData as GlobalMarketData} />
      <CryptoTable data={top10MarketCap as Top10MarketCapData} />
    </main>
  );
};

const PortfolioAllocationChart = ({ data }: { data: Top10MarketCapData }) => {
  const dp: PortfolioAllocationDistribution = {
    stableAssets: [],
    midCapGrowthAssets: [],
    highRiskAssets: [],
  };

  const allocationPercentage: [string, number, number, number][] = [];
  data.forEach((v) => {
    const entryPrice = v.current_price;
    const highPrice = v.high_24h;
    const lowPrice = v.low_24h;
    const stopLossPrice = entryPrice - 0.05 * 100;
    const targetPrice = highPrice;
    const RRR = (entryPrice - stopLossPrice) / (targetPrice - entryPrice);
    const volatility = ((highPrice - lowPrice) / lowPrice) * 100;
    allocationPercentage.push([v.name, RRR / volatility, RRR, volatility]);
  });

  const coins = allocationPercentage.map((row) => row[0]);
  let scores = allocationPercentage.map((row) => row[1]);

  //  Define caps and base allocations
  const maxStablecoinAlloc = 0.2; // 20% cap for stablecoins
  const minBaseAlloc = 0.05; // 5% minimum allocation for BTC & ETH

  const stablecoins = ["Tether", "USDC"];
  const baseCoins = ["Bitcoin", "Ethereum"];

  //  Normalize scores to sum to 100%
  const totalScore = scores.reduce((sum, val) => sum + val, 0);
  let allocations = scores.map((score) => score / totalScore);

  //  Apply stablecoin cap
  let stablecoinSum = stablecoins.reduce((sum, coin) => {
    const index = coins.indexOf(coin);
    return sum + (index !== -1 ? allocations[index] : 0);
  }, 0);

  // If stablecoins exceed cap, scale them down
  if (stablecoinSum > maxStablecoinAlloc * 2) {
    stablecoins.forEach((coin) => {
      const index = coins.indexOf(coin);
      if (index !== -1) allocations[index] = maxStablecoinAlloc;
    });
  }

  // Ensure minimum allocation for BTC & ETH
  baseCoins.forEach((coin) => {
    const index = coins.indexOf(coin);
    if (index !== -1 && allocations[index] < minBaseAlloc) {
      allocations[index] = minBaseAlloc;
    }
  });

  //  Re-normalize to sum 100% after adjustments
  const newTotal = allocations.reduce((sum, val) => sum + val, 0);
  allocations = allocations.map((alloc) => alloc / newTotal);

  const a = coins.map((coin, i) => [
    coin,
    Number((allocations[i] * 100).toFixed(2)),
  ]);

  const sortedAllocationsByPercentage = a.sort((a: any, b: any) => b[1] - a[1]);

  sortedAllocationsByPercentage.forEach((v: any, i) => {
    if (i < 2) {
      dp.stableAssets.push(v[0]);
    } else if (i > 2 && i <= 4) {
      dp.midCapGrowthAssets.push(v[0]);
    } else {
      dp.highRiskAssets.push(v[0]);
    }
  });

  const data01 = [
    {
      name: "Stable Assets",
      value: 500,
      text: dp.stableAssets.join(", "),
      percent: 50,
    },
    {
      name: "Mid Cap Growth Assets",
      value: 300,
      text: dp.midCapGrowthAssets.join(", "),
      percent: 30,
    },
    {
      name: "High Risk Assets",
      value: 200,
      text: dp.highRiskAssets.join(", "),
      percent: 20,
    },
  ];

  const label = "Portfolio Allocation";
  // const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
  const COLORS = ["#2D5C54", "#4FA193", "#65CFBD"];

  const toolTipFormatter = (v: string, n: string, props: any) =>
    `${props.payload.text}`;
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      className=" border-1  max-h-fit grid place-items-center rounded-lg mt-2"
    >
      <Suspense fallback={<Loader />}>
        <PieChartGraph
          label={label}
          data={data01}
          label={label}
          toolTipFormatter={toolTipFormatter as any}
          fillColors={COLORS}
        />
      </Suspense>
    </div>
  );
};

const MarketShareTrends = ({ data }: { data: GlobalMarketData }) => {
  const alt = 100 - data.market_cap_percentage?.btc;
  const data01: StackedBarChartGraphData[] = [
    {
      name: "BTC vs Altcoins Market Share",
      dp1: alt.toFixed(2),
      dp2: data.market_cap_percentage?.btc.toFixed(2),
      amt: 100,
    },
  ];

  const label = "BTC vs Altcoins Trend";

  const toolTipFormatter = (value: string) => `${value}%`;

  const stackedBarChartNames = [
    {
      name: "BTC",
      fill: "#4FA193",
      key: "dp1",
    },
    { name: "Altcoins", fill: "#65CFBD", key: "dp2" },
  ];
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      className=" border-1 max-h-fit grid place-items-center rounded-lg mt-2"
    >
      <Suspense fallback={<Loader />}>
        <StackedBarChart
          data={data01}
          label={label}
          stackedBarChartNames={stackedBarChartNames}
          toolTipFormatter={toolTipFormatter as any}
        />
      </Suspense>
    </div>
  );
};

const CryptoVolumeTrends = ({ data }: { data: GlobalMarketData }) => {
  const data01 =
    data?.total_volume &&
    Object.entries(data.total_volume)
      .slice(0, 10)
      .map((v) => ({
        subject: v[0],
        A: Number(Number(v[1]).toFixed(2)),
        unit: "M",
        // B: 1,
        // fullMark: Number(`1e${Number(v[1]).toFixed(0).length}`),
      }));
  const label = "Top 10 Crypto Trade Volume";

  const toolTipFormatter = (value: string) =>
    `${(Number(value) / 1e6).toFixed(2)}M`;
  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      className=" border-1 max-h-fit grid place-items-center rounded-lg mt-2"
    >
      <Suspense fallback={<Loader />}>
        <RadarChartGraph
          data={data01}
          label={label}
          toolTipFormatter={toolTipFormatter as any}
        />
      </Suspense>
    </div>
  );
};

const CryptoTable = ({ data }: { data: Top10MarketCapData }) => {
  const columns = [
    {
      name: "Rank",
      accessor: "rank",
    },
    {
      name: "Name",
      accessor: "name",
    },
    {
      name: "Price",
      accessor: "current_price",
    },
    {
      name: "Market Cap in (m)",
      accessor: "market_cap",
    },
    {
      name: "Price Change",
      accessor: "price_change_percentage_24h",
    },
  ];

  const tableData = data.map((item) => ({
    id: item.id,
    rank: item.market_cap_rank,
    name: item.name,
    current_price: item.current_price.toLocaleString(),
    market_cap: item.market_cap,
    price_change_percentage_24h: item.price_change_percentage_24h.toFixed(2),
  }));

  return (
    <div
      style={{
        backgroundColor: "var(--color-bg)",
        borderColor: "var(--color-border)",
        color: "var(--color-fg)",
      }}
      className=" max-h-fit p-5 rounded-lg border-1  col-span-3"
    >
      <Suspense fallback={<Loader />}>
        <Table data={tableData} columns={columns} />
      </Suspense>
    </div>
  );
};
export default Dashboard;
