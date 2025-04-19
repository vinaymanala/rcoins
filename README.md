# Rcoins Project

This project demonstrates a cryptocurrency site which displays information about trending and most popular ones:

- leverages the coingecko REST API to analyze the data.

---

## 🚀 Features

- Dashboard showcasing Top 10 cryptocurrencies and statistics.
- Cryptocurrency dashboard Ex. (Bitcoin) specific data analysis
- Search cryptocurrencies across all the chains.

---

## 📂 Project Structure

```plaintext
src/
├── libs/
│   ├── hooks.ts            # Custom hooks implementation
│   ├── services.tsx        # API endpoints
│   ├── types.ts            # custom types written for props and components
├── components/
│   ├──providers/           # Theme provider setup
|   ├── App.tsx             # Drives the dashboard and routes
|   ├── main.tsx            # Main entry file which includes provider
|   ├── tsconfig.app.json   # Typescript config
|   ├── vercel.json         # Vercel deployment config
```

---

## 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vinaymanala/rcoins.git
   cd rcoins
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Run the development server:

   ```bash
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Dashbaord Page

Displays the Portfolio allocation, Top trends, Total volumes metrics of top performing cryptocurrencies.

### Crypto Dashboard Pages

Displays the searched cryptocurrency data analysis and other information.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---
