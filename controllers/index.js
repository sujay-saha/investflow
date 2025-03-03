let stocks = [
  { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
  { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.1 },
  { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.5 },
];

let trades = [
  {
    tradeId: 1,
    stockId: 1,
    quantity: 10,
    tradeType: 'buy',
    tradeDate: '2024-08-07',
  },
  {
    tradeId: 2,
    stockId: 2,
    quantity: 5,
    tradeType: 'sell',
    tradeDate: '2024-08-06',
  },
  {
    tradeId: 3,
    stockId: 3,
    quantity: 7,
    tradeType: 'buy',
    tradeDate: '2024-08-05',
  },
];

  function getStocks() {
  return  {stocks};
}
async function getStockByTicker(ticker) {
  let stock = stocks.find((stock) => stock.ticker === ticker);
  if(!stock){
    return null;
  }
  return { stock };
}

function validateTradeData(tradeData) {
  if (!tradeData.stockId || typeof tradeData.stockId !== 'number') {
    return "Stock Id is required and should be a number";
  }
  if (!tradeData.quantity || typeof tradeData.quantity !== 'number') {
    return "Quantity is required and should be a number";
  }
  if (!tradeData.tradeType || typeof tradeData.tradeType !== 'string') {
    return "Trade Type is required and should be a string";
  }
  if (!tradeData.tradeDate || typeof tradeData.tradeDate  !== 'string') {
    return "Trade Date is required and should be a string";
  }
  return null;
}

 function addTrade(tradeVal){
  tradeVal.tradeId = trades.length + 1;
  trades.push(tradeVal);

  return tradeVal;
}

module.exports = { getStocks, getStockByTicker, validateTradeData ,addTrade};
