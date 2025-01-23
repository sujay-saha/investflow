const request =require("supertest");
const{ app } = require("../index.js")
const { getStocks, getStockByTicker, validateTradeData,addData} = require("../controllers");
const http = require("http");

jest.mock("../controllers",()=>({
    ...jest.requireActual("../controllers"),
    getAllEmployees:jest.fn(),
}));

let server;

beforeAll(async()=>{
    server = http.createServer(app);
    server.listen(3001);
});

afterAll(async ()=>{
    server.close();
});

describe("API Endpoints Test",()=>{

    

});