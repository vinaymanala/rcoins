const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "x-cg-demo-api-key": import.meta.env.VITE_API_KEY,
  },
};

export async function getSearchQueryResult(query: string) {
  try {
    const abortController = new AbortController();
    if (abortController.signal) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        { ...options, signal: abortController.signal }
      );
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getTop10MarketCap() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1",
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getGlobalMarketData() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/global",
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCryptoGraphData(cryptocurrency: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptocurrency}/market_chart?vs_currency=usd&days=30`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getCryptocurrencyData(cryptocurrency: string) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${cryptocurrency}`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
