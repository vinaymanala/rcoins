# Given data

entry_price = 84351
stop_loss_price = 83239
target_price = 84492

# Calculate Risk-Reward Ratio (RRR)

risk = entry_price - stop_loss_price
reward = target_price - entry_price
rrr = risk / reward if reward != 0 else None

# Allocate Portfolio Based on RRR and volatility (performance & weight allocation)

https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1

Use top-performing coins by market cap.

Allocate percentages based on historical performance and volatility.

Example:

50% Stable Assets (BTC, ETH)

30% Mid-cap growth (SOL, DOT, AVAX)

20% High-risk (MEME coins, new projects)

# Market Dominance Tracker (Stacked Bar Chart)

Purpose: Show BTC vs. Altcoin market share trends.

BTC dominance above 50% → Altcoins underperforming.

BTC dominance below 50% → Altcoins performing better.

# Whale Activity Analysis (On-Chain Data)

Purpose: Track large transactions (whales) to predict market moves.

If whales buy large amounts, price may pump.

If whales sell, price may dump.

# Top 10 Cryptos by Market Cap

GET https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10

Chart: Market Cap Distribution (Pie Chart)

# Bitcoin & Ethereum Price History

GET https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30

Chart: 30-Day Price Trend (Line Chart)

# 24h Volume & Price Change

GET https://api.coingecko.com/api/v3/global

Chart: 24h Price % Change (Bar Chart)
