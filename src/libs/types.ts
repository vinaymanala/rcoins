export type Top10MarketCapDataParams = {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  high_24h: number;
  low_24h: number;
};

export type Top10MarketCapData = Top10MarketCapDataParams[];

export type PortfolioAllocationDistribution = {
  stableAssets: string[];
  midCapGrowthAssets: string[];
  highRiskAssets: string[];
};

export type GlobalMarketData = {
  active_cryptocurrencies: number;
  upcoming_icos: number;
  ongoing_icos: number;
  ended_icos: number;
  markets: number;
  total_market_cap: {
    usd: number;
  };
  total_volume: {};
  market_cap_percentage: {
    btc: number;
  };
  market_cap_change_percentage_24h_usd: number;
  updated_at: number;
};

export type TableProps = {
  data: {
    [k: number]: { [k: string]: string | number | null };
  };
  columns: {
    name: string;
    accessor: string;
  }[];
};

export type RadarChartGraphData = {
  subject: string;
  A: number;
  unit: string;
};

export type PieChartGraphData = {
  name: string;
  value: number;
  percent: number;
};

export type StackedBarChartGraphData = {
  name: string;
  dp1: number | string;
  dp2: number | string;
  amt: number;
};

export type StackedBarChartGraphNames = {
  name: string;
  fill: string;
};

export type CryptoVolumeTrendsProps = {
  data: GlobalMarketData;
};

export type MarketShareTrendsProps = {
  data: GlobalMarketData;
};

export type DashboardProps = {
  data: GlobalMarketData;
};

export type LineChartProps = {
  data: {
    priceChartData: {
      date: Date;
      dp: number;
    }[];
    marketCapsData: {
      date: Date;
      dp: number;
    }[];
    totalVolumesData: {
      date: Date;
      dp: number;
    }[];
    labels: string[];
  };
  toolTipFormatter: (props: string) => string;
};

export type RadarChartGraphProps = {
  label: string;
  data: RadarChartGraphData[];
  toolTipFormatter: (props: { [k: string]: { [k: string]: string } }) => string;
};

export type PieChartGraphProps = {
  title: string;
  data: PieChartGraphData[];
  toolTipFormatter: (props: { [k: string]: { [k: string]: string } }) => string;
  fillColors: string[];
};

export type StackedBarChartProps = {
  label: string;
  data: StackedBarChartGraphData[];
  stackedBarChartNames: StackedBarChartGraphNames[];
  toolTipFormatter: (props: { [k: string]: { [k: string]: string } }) => string;
};

export type CryptoChartData = {
  prices: number[];
  market_caps: number[];
  total_volumes: number[];
};

export type CryptoChartProps = {
  priceChartData: [Date, number];
  marketCapsData: [Date, number];
  totalVolumesData: [Date, number];
  labels: string[];
  toolTipFormatter: (value: number) => string;
};

export type CryptoCurrencyData = {
  description: { [k: string]: string };
  links: { [k: string]: string };
  image: { [k: string]: string };
  genesis_date: string;
  sentiment_votes_up_percentage: number;
  sentiment_votes_down_percentage: number;
  market_cap_rank: number;
  localization: { [k: string]: string };
  symbol: string;
  contract_address: string;
  watchlist_portfolio_users: number;
  last_updated: string;
  name: string;
  community_data: { [k: string]: string };
};
