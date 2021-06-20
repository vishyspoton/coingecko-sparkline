const { ChartJSNodeCanvas } = require("chartjs-node-canvas");
const fs = require("fs");
const { getChartData } = require("./coingecko");

const chartJSNodeCanvas = new ChartJSNodeCanvas({
  width: 325,
  height: 150,
  chartCallback: null,
});

// Chart Colours
const chartColors = {
  red: "rgb(255, 82, 65)",
  green: "rgb(78, 175, 10)",
};

async function plotChart(coinName) {
  const prices = await getChartData(coinName);

  const timeStamps = prices.map((priceData) => priceData[0]);
  const pricesInUsd = prices.map((priceData) => priceData[1]);

  const startPrice = prices[0];
  const endPrice = prices[prices.length - 1];

  const chartColour =
    endPrice > startPrice ? chartColors.green : chartColors.red;

  const configuration = {
    type: "line",
    data: {
      labels: timeStamps,
      datasets: [
        {
          label: "My First dataset",
          backgroundColor: chartColour,
          borderColor: chartColour,
          data: pricesInUsd,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      tooltips: {
        enabled: false,
        mode: "label",
      },
      hover: {
        mode: "nearest",
        intersect: true,
      },
      scales: {
        xAxes: [
          {
            display: false,
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: false,
              labelString: "Date",
            },
          },
        ],
        yAxes: [
          {
            display: false,
            gridLines: {
              display: false,
            },
            scaleLabel: {
              display: false,
              labelString: "Price(USD)",
            },
          },
        ],
      },
    },
  };

  const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  fs.writeFileSync("./trendline.png", image);
}

plotChart("bitcoin");
