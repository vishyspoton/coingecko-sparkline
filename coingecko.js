const axios = require("axios");

async function getChartData(coinName, days = 8) {
  const { status, data } = await axios.get(
    `https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?vs_currency=usd&days=${days}&interval=hourly`
  );

  return data["prices"];
}

async function getPriceChange(coinName) {
  const { status, data } = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinName}&vs_currencies=usd&include_24hr_change=true`
  );

  return data[coinName];
}

module.exports = {
  getChartData,
  getPriceChange,
};
