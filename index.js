const express = require('express');
const cors = require('cors');
const { resolve } = require('path');
const {
  getStocks,
  getStockByTicker,
  validateTradeData,
  addData,
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
  let stock = getStockByTicker(ticker);
  if(stock){
    return res.status(404).send("Ticker Not Found");
  }
  res.json(stock);
});

app.post('/trades/new', async (req, res) => {
  let tradesData = req.body;
  const error = await validateTradeData(tradesData);
  console.log(error);
  if (error) {
    return res.status(400).json({ error });
  }
  let trade = await addData(tradesData);
  res.status(201).json({ trade });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = { app };
