const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
};

export async function getSearchQueryResult(query: string) {
  const abortController = new AbortController();
  if (abortController.signal) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`,
      { ...options, signal: abortController.signal }
    );
    const data = await response.json();
    return data;
  }
}

export async function getTop10MarketCap() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
    options
  );
  const data = await response.json();
  return data;
}

export async function getGlobalMarketData() {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/global",
    options
  );
  const data = await response.json();
  return data;
}

export async function getCryptoGraphData(cryptocurrency: string) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${cryptocurrency}/market_chart?vs_currency=usd&days=30`,
    options
  );
  const data = await response.json();
  return data;
}

export async function getCryptocurrencyData(cryptocurrency: string) {
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${cryptocurrency}`,
    options
  );
  const data = await response.json();
  return data;
}
