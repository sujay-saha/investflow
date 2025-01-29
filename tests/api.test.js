const request =require("supertest");
const{ app } = require("../index.js")
const { getStocks, getStockByTicker, validateTradeData,addTrade} = require("../controllers");
const http = require("http");

jest.mock("../controllers",()=>({
    ...jest.requireActual("../controllers"),
    getStocks:jest.fn(),
    addTrade:jest.fn(),
}));

let server;

beforeAll(async()=>{
    server = http.createServer(app);
    server.listen(3001);
});

afterAll(async ()=>{
    server.close();
});

let stocks = [
    { stockId: 1, ticker: 'AAPL', companyName: 'Apple Inc.', price: 150.75 },
    { stockId: 2, ticker: 'GOOGL', companyName: 'Alphabet Inc.', price: 2750.1 },
    { stockId: 3, ticker: 'TSLA', companyName: 'Tesla, Inc.', price: 695.5 },
  ];

  let trades = [
    { tradeId: 1, stockId: 1, quantity: 10, tradeType: 'buy', tradeDate: '2024-08-07' },
    { tradeId: 2, stockId: 2, quantity: 5, tradeType: 'sell', tradeDate: '2024-08-06' },
    { tradeId: 3, stockId: 3, quantity: 7, tradeType: 'buy', tradeDate: '2024-08-05' },
  ];


describe("API Endpoints Test",()=>{

    beforeEach(()=>{
        jest.clearAllMocks();
    });

    it("should fetch all stocks", async ()=>{
        getStocks.mockReturnValue({stocks});

        const res = await request(server).get("/stocks");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({stocks});
    });

    it("should fetch particular stock shared as ticker", async ()=>{
        const res = await request(server).get("/stocks/AAPL");
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({stock:stocks[0]});
    });

    it("should add a new trade", async()=>{
        addTrade.mockReturnValue({
             stockId: 1, quantity: 10, tradeType: 'buy', tradeDate: '2024-08-07', tradeId: 4
          });
        let newTrade = {
            stockId: 1, quantity: 10, tradeType: 'buy', tradeDate: '2024-08-07'
          };
        const res = await request(server).post("/trades/new").send(newTrade);
        expect(res.statusCode).toBe(201);

        newTrade.tradeId = 4;
        trades.push(newTrade);
        console.log(trades);

        expect(res.body).toEqual({
            "trade": newTrade
        });
    });

    it("should fetch particular stock shared as ticker", async()=>{
        const res = await request(server).get("/stocks/AAPL1");
        expect(res.statusCode).toBe(404);
        expect(res.text).toEqual("Ticker Not Found");
    });

    it("should show 400 for invalid trade", async()=>{
        let errorTrades = [{
            "stockId": "1",
            "quantity": 15,
            "tradeType": "buy",
            "tradeDate": "2024-08-08"
          },{
            "stockId": 1,
            "tradeType": "buy",
            "tradeDate": "2024-08-08"
          },{
            "stockId": 1,
            "quantity": 15,
            "tradeType": 1,
            "tradeDate": "2024-08-08"
          },{
            "stockId": 1,
            "quantity": 15,
            "tradeType": "buy",
            "tradeDate": 1
          }];
          
        const res0 = await request(server).post("/trades/new").send(errorTrades[0]);
        expect(res0.statusCode).toBe(400);

        expect(res0.text).toEqual("\"Stock Id is required and should be a number\"");

        const res1 = await request(server).post("/trades/new").send(errorTrades[1]);
        expect(res1.statusCode).toBe(400);

        expect(res1.text).toEqual('\"Quantity is required and should be a number\"');

        const res2 = await request(server).post("/trades/new").send(errorTrades[2]);
        expect(res2.statusCode).toBe(400);

        expect(res2.text).toEqual('\"Trade Type is required and should be a string\"');

        const res3 = await request(server).post("/trades/new").send(errorTrades[3]);
        expect(res3.statusCode).toBe(400);

        expect(res3.text).toEqual('\"Trade Date is required and should be a string\"');
    });

    it("GET API /stocks fetch all stocks and invoke getStocks method", async ()=>{
        getStocks.mockReturnValue({stocks});
        const res =  await request(server).get("/stocks");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({stocks});
    });

    it("POST API /trade/new add new trade and invoke addTrade method", async ()=>{
         let newTradeFull={
            tradeId: 4, stockId: 1, quantity: 10, tradeType: 'buy', tradeDate: '2024-08-07'
          };
          let newTrade={ stockId: 1, quantity: 10, tradeType: 'buy', tradeDate: '2024-08-07'
          };
        addTrade.mockReturnValue(newTradeFull);
        const res =  await request(server).post("/trades/new").send(newTrade);

        expect(res.body).toEqual({trade:newTradeFull});
    });

});
