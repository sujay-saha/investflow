const express = require('express');
const cors = require('cors');
const { resolve } = require('path');
const {
  getStocks,
  getStockByTicker,
  validateTradeData,
} = require('./controllers');

const app = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get('/stocks', (req, res) => {
  let stocks = getStocks();
  res.json(stocks);
});

app.get('/stocks/:ticker', (req, res) => {
  let ticker = req.params.ticker;
  console.log(ticker);
  let stock = getStockByTicker(ticker);
  console.log(stock);
  res.json(stock);
});

app.post('/trades/new', (req, res) => {
  let tradesData = req.body;
  const error = validateTradeData(tradesData);
  if (!error) {
    return res.status(400).json({ error });
  }
  trade = { id: trades.length + 1, ...tradesData };
  trades.push(trade);
  res.status(201).json({ trade });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = { app };
