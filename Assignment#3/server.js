const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 3000
const finnhub = require('finnhub');
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://deepsusanta:UasRKeE6rXo88bKz@cluster0.9zn3ks4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const axios = require('axios');
const path = require('path');
const {restClient} = require('@polygon.io/client-js')
const { format, addMonths, addWeeks, addYears } = require('date-fns');
const api_key = finnhub.ApiClient.instance.authentications['api_key'];
api_key.apiKey = 'cnltqd1r01qut4m3ut80cnltqd1r01qut4m3ut8g';
const polygonKey = 'dIWXoftB1ZBe6DaBmRmHUYcnjBsOrnug';
const finnhubkey = 'cnltqd1r01qut4m3ut80cnltqd1r01qut4m3ut8g';
const rest = restClient(polygonKey);
app.use(express.static(path.join(__dirname, '/public')));


app.get('/search/home', (req, res) => {
  res.sendFile(__dirname + 'public/index.html');
});
app.get('/autocomplete', async (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const apiUrl = `https://finnhub.io/api/v1/search?q=${stockTicker}&token=${finnhubkey}`;
    const response = await new Promise((resolve, reject) => {
      axios.get(apiUrl)
          .then(response => {
              resolve(response.data);
          })
          .catch(error => {
              reject(error);
          });
  });
  res.json(response)
  });
app.get('/earnings', (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const apiUrl = `https://finnhub.io/api/v1/stock/earnings?symbol=${stockTicker}&token=${finnhubkey}`;

    axios.get(apiUrl)
      .then(response => {
        const insiderSentimentData = response.data;
         res.json(insiderSentimentData)
      })
      .catch(error => {
        console.error('Error fetching insider sentiment data:', error.message);
      });
  });
  app.get('/quotes', async (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const finnhubClient = new finnhub.DefaultApi();
    let companyData = {profileData:'',stockData:''}; 
    const apiUrl1 = `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=${finnhubkey}`;
    const apiUrl2 = `https://finnhub.io/api/v1/stock/profile2?symbol=${stockTicker}&token=${finnhubkey}`
    const [profileResponse, quoteResponse] = await Promise.all([
      axios.get(apiUrl1),
      axios.get(apiUrl2)
  ]);
  companyData.profileData = profileResponse.data;
  companyData.stockData = quoteResponse.data;
  res.json(companyData);
    });
  app.get('/company', async (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const finnhubClient = new finnhub.DefaultApi();
    let companyData = {profileData:'',stockData:'',peers:''}; 
    var apiUrl1 = ''
    var apiUrl2 = ''
    var apiUrl3 = '' 
    apiUrl1 =  `https://finnhub.io/api/v1/stock/profile2?symbol=${stockTicker}&token=${finnhubkey}`
    apiUrl2 =  `https://finnhub.io/api/v1/quote?symbol=${stockTicker}&token=${finnhubkey}`
    apiUrl3 =  `https://finnhub.io/api/v1/stock/peers?symbol=${stockTicker}&token=${finnhubkey}`
    const [profileResponse, quoteResponse, peersResponse] = await Promise.all([
      axios.get(apiUrl1),
      axios.get(apiUrl2),
      axios.get(apiUrl3)
  ]);
  companyData.profileData = profileResponse.data;
  companyData.stockData = quoteResponse.data;
  companyData.peers = peersResponse.data;
  res.json(companyData);
    });
  
    app.get('/insider', (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const apiUrl = `https://finnhub.io/api/v1/stock/insider-sentiment?symbol=${stockTicker}&from=2022-01-01&token=${finnhubkey}`;

    axios.get(apiUrl)
      .then(response => {
        const insiderSentimentData = response.data;
         res.json(insiderSentimentData)
      })
      .catch(error => {
        console.error('Error fetching insider sentiment data:', error.message);
      });
  });
  app.get('/recom', (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const finnhubClient = new finnhub.DefaultApi(); 
      finnhubClient.recommendationTrends(stockTicker, (error, recommendationInfo) => {
        if (error) {
          res.status(500).send({ error: 'Internal Server Error' });
        } else {
          res.json(recommendationInfo);
        }
      });
    });
  app.get('/chart', async (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const timestamp = req.query.timestamp;
    const checkDate = new Date(timestamp*1000);
    const onedayAgo = new Date(checkDate);
    onedayAgo.setDate(checkDate.getDate() - 1);
    const formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const onedayAgoFormatted = formatDate(onedayAgo);
    const checkDateFormatted = formatDate(checkDate);
    var apiurl = `https://api.polygon.io/v2/aggs/ticker/${stockTicker}/range/1/hour/${onedayAgoFormatted}/${checkDateFormatted}?adjusted=true&sort=asc&apiKey=${polygonKey}`
    const response = await new Promise((resolve, reject) => {
      axios.get(apiurl)
          .then(response => {
              resolve(response.data);
          })
          .catch(error => {
              reject(error);
          });
  });
  res.json(response)
  });
  app.get('/Charts', (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const checkDate = new Date();
    const twoYearsAgo = new Date(checkDate.getFullYear() - 2, checkDate.getMonth(), checkDate.getDate());
    const formatDate = date => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const checkDateFormatted = formatDate(checkDate);
    const twoYearsAgoFormatted = formatDate(twoYearsAgo);
    rest.stocks.aggregates(stockTicker, 1, "day", twoYearsAgoFormatted, checkDateFormatted).then((data) => {
      res.json(data)
    }).catch(e => {
      console.error('An error happened:', e);
    });
  });
  app.get('/add_watchlist', async (req, res) => {
    const client = new MongoClient(uri);
    var result = ''
    try {  
    const stockTicker = req.query.stock_ticker;
    const database = client.db("portfolioandwatchlistinfo");
    const watchlist = database.collection('watchlist')
    const doc = {
      stock_ticker: stockTicker,
    }
    result = await watchlist.insertOne(doc);
    } finally {
      await client.close();
      res.json(result)
    }
});
  app.get('/remove_watchlist', async (req, res) => {
    const client = new MongoClient(uri);
    var result = ''
    try {  
    const stockTicker = req.query.stock_ticker;
    const database = client.db("portfolioandwatchlistinfo");
    const watchlist = database.collection('watchlist')
    const doc = {
      stock_ticker: stockTicker,
    }
    result = await watchlist.deleteOne(doc);
    
    } finally {
      await client.close();
      res.json(result)
    }
  });
  app.get('/get_watchlist', async (req, res) => {
    const client = new MongoClient(uri);
    var result = ''
    try {  
    const database = client.db("portfolioandwatchlistinfo");
    const watchlist = database.collection('watchlist')
    result = await watchlist.find().toArray();
    } finally {
      await client.close();
      res.json(result)
    } 
  });
 
  app.get('/get_cash', async (req, res) => {
    const client = new MongoClient(uri);
    var result = ''
    try {  
    const database = client.db("portfolioandwatchlistinfo");
    const cash = database.collection('total_cash')
    result = await cash.find().toArray();
    } finally {
      await client.close();
      res.json(result)
    } 
  });
  app.get('/add_portfolio', async (req, res) => {
    const client = new MongoClient(uri);
    var result = ''
    try {  
    const stockTicker = req.query.stock_ticker;
    const value = req.query.value
    const quantity = req.query.quantity
    const database = client.db("portfolioandwatchlistinfo");
    const portfolio = database.collection('portfolio')
    const cash = database.collection('total_cash')
    const filter = { stock_ticker: stockTicker };
    const options = { upsert: true };
    const updateDoc = {
      $inc: {
        quantity: parseInt(req.query.quantity),
        value: parseFloat(req.query.value*req.query.quantity)
      },
    };
     result = await portfolio.updateOne(filter, updateDoc, options);
     const updateDoc1 = {
      $inc: {
        total_cash: -parseFloat(req.query.value*req.query.quantity)
      },
     }
     result =  await cash.updateOne({},updateDoc1)
    } finally {
      await client.close();
      res.json(result)
    }
  });
  app.get('/remove_portfolio', async (req, res) => {
    const client = new MongoClient(uri);
    var result = ''
    var result1 = ''
    try {  
    const stockTicker = req.query.stock_ticker;
    const value = req.query.value
    const quantity = req.query.quantity
    const database = client.db("portfolioandwatchlistinfo");
    const portfolio = database.collection('portfolio')
    const cash = database.collection('total_cash')
    const filter = { stock_ticker: stockTicker };
    const updateDoc = {
      $inc: {
        quantity: -parseInt(req.query.quantity),
        value: -parseFloat(req.query.value*req.query.quantity)
      },
    };
    result = await portfolio.updateOne(filter, updateDoc);
    const updatedDocument = await portfolio.findOne(filter);
    if (updatedDocument.quantity <= 0) {
      await portfolio.deleteOne(filter);
    }
    const count = await portfolio.countDocuments()
    if (count ==0)
    {
      result1 = "empty"
    }
    const updateDoc1 = {
      $inc: {
        total_cash: parseFloat(req.query.value*req.query.quantity)
      },
     }
     result =  await cash.updateOne({},updateDoc1)
    } finally {
      await client.close();
      res.json(result1)
    }
  });
  app.get('/get_portfolio', async (req, res) => {
    const client = new MongoClient(uri);
    var result = ''
    try {  
    const database = client.db("portfolioandwatchlistinfo");
    const portfolio = database.collection('portfolio')
    var result = await portfolio.find().toArray();
    } finally {
      await client.close();
      res.json(result)
    } 
  });
  app.get('/news', (req, res) => {
    const stockTicker = req.query.stock_ticker;
    const finnhubClient = new finnhub.DefaultApi();
  
    const todayDate = new Date();
    const fromDate = addYears(todayDate, -1);
  
    finnhubClient.companyNews(stockTicker,  format(fromDate, 'yyyy-MM-dd'),format(todayDate, 'yyyy-MM-dd'), (error, news) => {
      if (error) {
        res.status(500).send({ error: 'Internal Server Error' });
      } else {
        res.json(news);
      }
    });
  });
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

